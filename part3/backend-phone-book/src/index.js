const express = require('express');
const app = express();
const morgan = require('morgan')

const personsRouter = require('./routes/persons');

app.use(express.json());

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/persons', personsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
