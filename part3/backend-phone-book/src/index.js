const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

const personsRouter = require('./routes/persons');

app.use(express.json());
app.use(cors());

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/api/persons', personsRouter);

app.use(express.static(path.join(__dirname, '..', 'frontend-build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend-build', 'index.html'))
})

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
