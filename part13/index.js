import express from 'express';
import bodyParser from 'body-parser';
import blogsRoutes from './routes/blogsRoutes.js';
import 'express-async-errors';

const app = express();
app.use(bodyParser.json());

// Rutas para los blogs
app.use('/api/blogs', blogsRoutes);

app.use(errorHandler);

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
