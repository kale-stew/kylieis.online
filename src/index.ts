import { Hono } from 'hono'
import type { Env } from './env'
import { apiRoutes } from './routes/api'
import { dynamicRoutes } from './routes/dynamic'

const app = new Hono<{ Bindings: Env }>()

app.route('/api', apiRoutes)
app.route('/', dynamicRoutes)

app.get('/*', async (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
