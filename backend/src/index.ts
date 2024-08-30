import { Hono } from 'hono'
import { user } from './routes/user'
import { check } from './routes/verify'
import { blog } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono();
app.use('/*',cors())
app.route('/api/v1/user',user)
app.route('/api/v1/blog',blog)
app.route("/api/v1/verify",check);
export default app
