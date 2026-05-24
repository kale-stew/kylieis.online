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
  const { data } = matter(raw)
  const id = f.replace(/\.md$/, '')
  return {
    id,
    title: data.title,
    description: data.description ?? null,
    category: data.category ?? 'general',
    date: data.date ?? new Date().toISOString().split('T')[0],
    type: 'blog',
    tags: null,
  }
})

// Read talks
const talks = []
if (existsSync(talksDir)) {
  const talkFiles = readdirSync(talksDir).filter(f => f.endsWith('.md'))
  for (const f of talkFiles) {
    const raw = readFileSync(join(talksDir, f), 'utf-8')
    const { data } = matter(raw)
    const id = f.replace(/\.md$/, '')
    talks.push({
      id,
      title: data.title,
      description: data.description ?? null,
      category: data.category ?? 'general',
      date: data.date ?? new Date().toISOString().split('T')[0],
      type: 'talk',
      tags: null,
    })
  }
}

// Generate SQL insert statements
const esc = (s) => (s ?? '').replace(/'/g, "''")

const blogInserts = posts.map((p) => {
  return `INSERT OR IGNORE INTO posts (id, title, description, category, date, type, tags) VALUES ('${esc(p.id)}', '${esc(p.title)}', '${esc(p.description)}', '${esc(p.category)}', '${esc(p.date)}', 'blog', NULL);`
})

const talkInserts = talks.map((t) => {
  return `INSERT OR IGNORE INTO posts (id, title, description, category, date, type, tags) VALUES ('${esc(t.id)}', '${esc(t.title)}', '${esc(t.description)}', '${esc(t.category)}', '${esc(t.date)}', 'talk', NULL);`
})

console.log([...blogInserts, ...talkInserts].join('\n'))
console.error(`Generated ${blogInserts.length} blog posts and ${talkInserts.length} talks`)
