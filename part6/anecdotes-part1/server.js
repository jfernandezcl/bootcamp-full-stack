// eslint-disable-next-line no-undef
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
  if (req.method === 'POST' && req.body.content.length < 5) {
    return res.status(400).json({ error: 'Content must be at least 5 characters long' })
  }
  next()
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
