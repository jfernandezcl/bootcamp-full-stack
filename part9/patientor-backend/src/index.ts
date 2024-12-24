import express from 'express'

const app = express()
const PORT = 30001

app.get('/api/ping', (_req, res) => {
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})