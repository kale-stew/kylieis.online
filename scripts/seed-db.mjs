import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = join(__dirname, '..', 'content')
const files = readdirSync(contentDir).filter(f => f.endsWith('.md'))

const posts = files.map((f) => {
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

// Generate SQL insert statements
const inserts = posts.map((p) => {
  const esc = (s) => (s ?? '').replace(/'/g, "''")
  return `INSERT OR IGNORE INTO posts (id, title, description, category, date, type, tags) VALUES ('${esc(p.id)}', '${esc(p.title)}', '${esc(p.description)}', '${esc(p.category)}', '${esc(p.date)}', 'blog', NULL);`
})

console.log(inserts.join('\n'))
console.error(`Generated ${inserts.length} INSERT statements`)
