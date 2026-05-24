import { Hono } from 'hono'
import type { Env } from '../env'

const app = new Hono<{ Bindings: Env }>()

app.get('/health', (c) => c.json({ status: 'ok' }))

app.get('/search', async (c) => {
  const query = c.req.query('q')
  if (!query || query.trim().length === 0) {
    return c.json({ results: [] })
  }

  const stmt = c.env.DB.prepare(
    "SELECT id, title, description, category, date, type FROM posts WHERE title LIKE ? OR description LIKE ? OR content LIKE ? ORDER BY date DESC LIMIT 20"
  ).bind(`%${query}%`, `%${query}%`, `%${query}%`)

  const { results } = await stmt.all<{
    id: string
    title: string
    description: string | null
    category: string
    date: string
    type: string
  }>()

  return c.json({ results })
})

export { app as apiRoutes }
