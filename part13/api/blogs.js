import express from 'express';
import { createBlog, getBlogs, getBlogById, deleteBlog } from '../models/blogModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await getBlogs();
  res.json(blogs);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, author, url } = req.body;
  if (!title || !url) return res.status(400).json({ error: 'Título y URL son obligatorios' });

  const newBlog = await createBlog(title, author, url, req.user.userId);
  res.status(201).json(newBlog);
});

router.delete('/:id', authMiddleware, async (req, res) => { // NUEVO
  const blog = await getBlogById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog no encontrado' });

  if (blog.user_id !== req.user.userId) {
    return res.status(403).json({ error: 'No tienes permiso para eliminar este blog' });
  }

  await deleteBlog(req.params.id);
  res.status(204).end();
});

export default router;
