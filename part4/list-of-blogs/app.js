const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./config');
const usersRouter = require('./routes/users')
const loginRouter = require('./controllers/login');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.json());

const blogsRouter = require('./routes/blogs');
app.use('/api/blogs', blogsRouter);

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter);

module.exports = app;
