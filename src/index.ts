import { Hono } from 'hono'
import type { Env } from './env'
import { apiRoutes } from './routes/api'
import { dynamicRoutes } from './routes/dynamic'
import { ogRoutes } from './routes/og'

const app = new Hono<{ Bindings: Env }>()

app.route('/api', apiRoutes)
app.route('/', dynamicRoutes)
app.route('/og', ogRoutes)

app.get('/*', async (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
