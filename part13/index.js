import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import blogsRouter from './routes/blogsRoutes.js';
import usersRouter from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
