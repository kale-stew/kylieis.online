import { Hono, type Context } from 'hono'
import type { Env } from '../env'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { NowPage, type NowEntry } from '../pages/NowPage'
import { SearchPage } from '../pages/SearchPage'
import { getFeaturedProjects } from '../content'
import { getPhotos } from '../lib/photos-api'

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => {
  // Fetch posts from D1
  const { results: posts } = await c.env.DB.prepare(
    "SELECT id, title, description, category, date, type FROM posts WHERE draft = 0 OR draft IS NULL ORDER BY date DESC LIMIT 3"
  ).all<{
    id: string
    title: string
    description: string | null
    category: string
    date: string
    type: 'blog' | 'talk'
  }>()

  // Fetch photos from the central photos-api
  const { photos: apiPhotos } = await getPhotos({ site: 'kylieis-online', limit: 100 })

  return c.html(
    HomePage({
      recentPosts: posts ?? [],
      featuredProjects: getFeaturedProjects(),
      photos: apiPhotos,
    }).toString(),
    200
  )
})

// Rendered per request so photo edits in photos-api show up without a redeploy.
// If photos-api is down or returns nothing, fall back to the copy built at deploy time.
app.get('/about', async (c) => {
  const { photos } = await getPhotos({ site: 'kylieis-online', limit: 100 }).catch(() => ({ photos: [] }))
  if (photos.length === 0) return c.env.ASSETS.fetch(c.req.raw)
  return c.html(AboutPage({ photos }).toString(), 200)
})

const NOW_COLUMNS = 'date, location, celebrate, read, travel, learn, watch, listen, work'

async function renderNow(c: Context<{ Bindings: Env }>, date?: string) {
  const entry = date
    ? await c.env.DB.prepare(`SELECT ${NOW_COLUMNS} FROM now_entries WHERE date = ? LIMIT 1`).bind(date).first<NowEntry>()
    : await c.env.DB.prepare(`SELECT ${NOW_COLUMNS} FROM now_entries ORDER BY date DESC LIMIT 1`).first<NowEntry>()

  // unknown date: let the assets binding serve the site's 404 page
  if (date && !entry) return c.env.ASSETS.fetch(c.req.raw)

  const { results: allEntries } = await c.env.DB.prepare(
    'SELECT date FROM now_entries ORDER BY date DESC'
  ).all<{ date: string }>()

  return c.html(NowPage({ entry, allEntries: allEntries ?? [] }).toString(), 200)
}

app.get('/now', (c) => renderNow(c))

app.get('/now/:date{[0-9]{4}-[0-9]{2}-[0-9]{2}}', (c) => renderNow(c, c.req.param('date')))

app.get('/search', async (c) => {
  const query = c.req.query('q')

  if (!query || query.trim().length === 0) {
    return c.html(SearchPage({}).toString(), 200)
  }

  const stmt = c.env.DB.prepare(
    "SELECT id, title, description, category, date, type FROM posts WHERE (draft = 0 OR draft IS NULL) AND (title LIKE ? OR description LIKE ? OR content LIKE ?) ORDER BY date DESC LIMIT 20"
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
