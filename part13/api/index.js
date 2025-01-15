import express from 'express';
import bodyParser from 'body-parser';
import blogsHandler from './api/blogs.js';

const app = express();
app.use(bodyParser.json());

// Ruta para los blogs
app.use('/api/blogs', blogsHandler);

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
