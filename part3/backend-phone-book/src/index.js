const express = require('express');
const app = express();

const personsRouter = require('./routes/persons');

app.use(express.json()); // Asegúrate de que esto esté aquí

app.use('/api/persons', personsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
