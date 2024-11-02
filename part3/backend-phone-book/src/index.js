const express = require('express')
const app = express()

const personsRouter = require('./routes/persons')

app.use('/api/persons', personsRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`)
})