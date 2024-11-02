const express = require('express');
const app = express();
const morgan = require('morgan')

const personsRouter = require('./routes/persons');

app.use(express.json());
app.use(morgan('tiny'))

app.use('/api/persons', personsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
