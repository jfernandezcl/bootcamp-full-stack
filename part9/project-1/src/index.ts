import express from 'express'

const app = express()
const PORT = 3000

app.get('/Hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})