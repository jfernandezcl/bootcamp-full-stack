const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const todosRouter = require('./routes/todos');

const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Rutas
app.use('/todos', todosRouter);

module.exports = app;
