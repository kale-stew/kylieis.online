import { Hono } from 'hono'
import type { Env } from './env'

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ status: 'ok' }))

app.get('/*', async (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
