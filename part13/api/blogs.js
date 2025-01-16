import express from 'express';
import { createBlog, getBlogs } from '../models/blogModel.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // NUEVO

const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await getBlogs();
  res.json(blogs);
});

router.post('/', authMiddleware, async (req, res) => { // NUEVO
  const { title, author, url } = req.body;
  if (!title || !url) return res.status(400).json({ error: 'Título y URL son obligatorios' });

  const newBlog = await createBlog(title, author, url, req.user.userId);
  res.status(201).json(newBlog);
});

export default router;
