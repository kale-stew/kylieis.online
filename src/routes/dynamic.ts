import { Hono } from 'hono'
import type { Env } from '../env'
import { HomePage } from '../pages/HomePage'
import { NowPage } from '../pages/NowPage'
import { SearchPage } from '../pages/SearchPage'
import { getFeaturedProjects } from '../content'

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => {
  const { results: posts } = await c.env.DB.prepare(
    "SELECT id, title, description, category, date, type FROM posts ORDER BY date DESC LIMIT 3"
  ).all<{
    id: string
    title: string
    description: string | null
    category: string
    date: string
    type: 'blog' | 'talk'
  }>()

  return c.html(
    HomePage({
      recentPosts: posts ?? [],
      featuredProjects: getFeaturedProjects(),
    }).toString(),
    200
  )
})

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
    // No entries yet — show empty state
    return c.html(
      NowPage({
        entry: {
          date: new Date().toISOString().split('T')[0],
          location: null,
          celebrate: null,
          read: null,
          travel: null,
          learn: null,
          watch: null,
          listen: null,
          work: 'Setting up this page...',
        },
        allEntries: [],
      }).toString(),
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

  return c.html(SearchPage({ query, results }).toString(), 200)
})

export { app as dynamicRoutes }
