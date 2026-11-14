import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = join(__dirname, '..', 'content')
const talksDir = join(contentDir, 'talks')

// Read blog posts
const blogFiles = readdirSync(contentDir).filter(f => f.endsWith('.md'))
const posts = blogFiles.map((f) => {
  const raw = readFileSync(join(contentDir, f), 'utf-8')
  const { data, content } = matter(raw)
  const id = f.replace(/\.md$/, '')
  return {
    id,
    title: data.title,
    description: data.description ?? null,
    category: data.category ?? 'general',
    date: data.date ?? new Date().toISOString().split('T')[0],
    type: 'blog',
    tags: data.tags ?? null,
    draft: data.draft === true,
    content,
  }
})

// Read talks
const talks = []
if (existsSync(talksDir)) {
  const talkFiles = readdirSync(talksDir).filter(f => f.endsWith('.md'))
  for (const f of talkFiles) {
    const raw = readFileSync(join(talksDir, f), 'utf-8')
    const { data, content } = matter(raw)
    const id = f.replace(/\.md$/, '')
    talks.push({
      id,
      title: data.title,
      description: data.description ?? null,
      category: data.category ?? 'general',
      date: data.date ?? new Date().toISOString().split('T')[0],
      type: 'talk',
      tags: null,
      content,
      presentedAt: data.presentedAt || [],
    })
  }
}

// Generate SQL insert statements
const esc = (s) => (s ?? '').replace(/'/g, "''")

// DRAFT env var is set by draft/preview workflows. Their db is shared, including
// with the unprotected kylieis-online-preview worker, so in draft mode a post is
// visible only if it is already published in production: PUBLISHED_IDS_FILE is
// the output of `wrangler d1 execute kylieis-online-db --json` selecting published
// ids. Without a readable file, every post is marked draft.
// Otherwise, a post is draft iff its frontmatter says `draft: true`.
const envDraft = process.env.DRAFT ? 1 : 0

function readPublishedIds(file) {
  if (!file) return null
  try {
    // wrangler can print a banner line ahead of its --json output
    const raw = readFileSync(file, 'utf-8')
    const rows = JSON.parse(raw.slice(raw.indexOf('['))).flatMap((r) => r.results ?? [])
    return new Set(rows.map((r) => r.id))
  } catch (e) {
    console.error(`could not read published ids from ${file}, marking every post draft: ${e.message}`)
    return null
  }
}
const publishedIds = envDraft ? readPublishedIds(process.env.PUBLISHED_IDS_FILE) : null

const draftFlagFor = (p) => {
  if (!envDraft) return p.draft ? 1 : 0
  return publishedIds?.has(p.id) && !p.draft ? 0 : 1
}

const blogInserts = posts.map((p) => {
  const draftFlag = draftFlagFor(p)
  const tags = p.tags ? `'${esc(p.tags)}'` : 'NULL'
  return `INSERT OR REPLACE INTO posts (id, title, description, category, date, type, tags, content, draft) VALUES ('${esc(p.id)}', '${esc(p.title)}', '${esc(p.description)}', '${esc(p.category)}', '${esc(p.date)}', 'blog', ${tags}, '${esc(p.content)}', ${draftFlag});`
})

const talkInserts = talks.map((t) => {
  const presentedAt = JSON.stringify(t.presentedAt)
  return `INSERT OR REPLACE INTO posts (id, title, description, category, date, type, tags, content, presented_at, draft) VALUES ('${esc(t.id)}', '${esc(t.title)}', '${esc(t.description)}', '${esc(t.category)}', '${esc(t.date)}', 'talk', NULL, '${esc(t.content)}', '${esc(presentedAt)}', ${draftFlagFor(t)});`
})

// /now entries: content/now.json is the source of truth, so replace the table
// wholesale (in every environment) to keep edits and deletions in sync.
const NOW_FIELDS = ['date', 'location', 'celebrate', 'read', 'travel', 'learn', 'watch', 'listen', 'work']
const nowPath = join(contentDir, 'now.json')
const nowEntries = existsSync(nowPath) ? JSON.parse(readFileSync(nowPath, 'utf-8')) : []
const sqlValue = (v) => (v == null || v === '' ? 'NULL' : `'${esc(String(v))}'`)
const nowStatements = nowEntries.length
  ? [
      'DELETE FROM now_entries;',
      ...nowEntries.map(
        (e) => `INSERT INTO now_entries (${NOW_FIELDS.join(', ')}) VALUES (${NOW_FIELDS.map((f) => sqlValue(e[f])).join(', ')});`
      ),
    ]
  : []

// In production, drop rows whose content file no longer exists so deleted or
// never-merged posts stop appearing on the home page and in search. Skipped in
// draft mode: the preview db is shared by every open PR.
const ids = [...posts, ...talks].map((p) => `'${esc(p.id)}'`)
const prune =
  !envDraft && ids.length > 0 ? [`DELETE FROM posts WHERE id NOT IN (${ids.join(', ')});`] : []

const modeLabel = !envDraft
  ? 'production'
  : publishedIds
    ? `draft, ${[...posts, ...talks].filter((p) => draftFlagFor(p) === 0).length} visible as published in production`
    : 'all-draft'

console.log([...blogInserts, ...talkInserts, ...prune, ...nowStatements].join('\n'))
console.error(
  `Generated ${blogInserts.length} blog posts, ${talkInserts.length} talks, and ${nowEntries.length} now entries (${modeLabel} mode${prune.length ? ', pruning rows without content files' : ''})`
)
