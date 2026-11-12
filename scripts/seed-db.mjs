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

// DRAFT env var is set by draft/preview workflows to mark ALL posts as draft.
// Otherwise, a post is draft iff its frontmatter says `draft: true`.
const envDraft = process.env.DRAFT ? 1 : 0

const blogInserts = posts.map((p) => {
  const draftFlag = envDraft || (p.draft ? 1 : 0)
  const tags = p.tags ? `'${esc(p.tags)}'` : 'NULL'
  return `INSERT OR REPLACE INTO posts (id, title, description, category, date, type, tags, content, draft) VALUES ('${esc(p.id)}', '${esc(p.title)}', '${esc(p.description)}', '${esc(p.category)}', '${esc(p.date)}', 'blog', ${tags}, '${esc(p.content)}', ${draftFlag});`
})

const talkInserts = talks.map((t) => {
  const presentedAt = JSON.stringify(t.presentedAt)
  return `INSERT OR REPLACE INTO posts (id, title, description, category, date, type, tags, content, presented_at, draft) VALUES ('${esc(t.id)}', '${esc(t.title)}', '${esc(t.description)}', '${esc(t.category)}', '${esc(t.date)}', 'talk', NULL, '${esc(t.content)}', '${esc(presentedAt)}', ${envDraft});`
})

// In production, drop rows whose content file no longer exists so deleted or
// never-merged posts stop appearing on the home page and in search. Skipped in
// draft mode: the preview db is shared by every open PR.
const ids = [...posts, ...talks].map((p) => `'${esc(p.id)}'`)
const prune =
  !envDraft && ids.length > 0 ? [`DELETE FROM posts WHERE id NOT IN (${ids.join(', ')});`] : []

console.log([...blogInserts, ...talkInserts, ...prune].join('\n'))
console.error(
  `Generated ${blogInserts.length} blog posts and ${talkInserts.length} talks (${envDraft ? 'all-draft' : 'production'} mode${prune.length ? ', pruning rows without content files' : ''})`
)
