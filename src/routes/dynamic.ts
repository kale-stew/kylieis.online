import { Hono } from 'hono'
import type { Env } from '../env'
import { NowPage } from '../pages/NowPage'
import { SearchPage } from '../pages/SearchPage'

const app = new Hono<{ Bindings: Env }>()

app.get('/now', async (c) => {
  const latest = await c.env.DB.prepare(
    'SELECT date, location, celebrate, read, travel, learn, watch, listen, work FROM now_entries ORDER BY date DESC LIMIT 1'
  ).first<{
    date: string
    location: string | null
    celebrate: string | null
    read: string | null
    travel: string | null
    learn: string | null
    watch: string | null
    listen: string | null
    work: string | null
  }>()

  const { results: allEntries } = await c.env.DB.prepare(
    'SELECT date FROM now_entries ORDER BY date DESC'
  ).all<{ date: string }>()

  if (!latest) {
    return c.html(
      SearchPage({ results: [], query: '' })
        .toString()
        .replace('<title>Search', '<title>Now'),
      200
    )
  }

  return c.html(
    NowPage({ entry: latest, allEntries }).toString(),
    200
  )
})

app.get('/search', async (c) => {
  const query = c.req.query('q')

  if (!query || query.trim().length === 0) {
    return c.html(SearchPage({}).toString(), 200)
  }

  const stmt = c.env.DB.prepare(
    "SELECT id, title, description, category, date, type FROM posts WHERE title LIKE ? OR description LIKE ? ORDER BY date DESC LIMIT 20"
  ).bind(`%${query}%`, `%${query}%`)

  const { results } = await stmt.all<{
    id: string
    title: string
    description: string | null
    category: string
    date: string
    type: string
  }>()

  return c.html(SearchPage({ query, results }).toString(), 200)
})

export { app as dynamicRoutes }
