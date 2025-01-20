import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import blogsRouter from './routes/blogs.js';
import authRouter from './routes/auth.js';
import readingListRoutes from './routes/readingList.js';


dotenv.config();

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/api/blogs', blogsRouter);
app.use('/api', authRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/reading-list', readingListRoutes);
app.use('/api/readinglists', readingListRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
