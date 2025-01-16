import express from 'express';
import { createBlog, getBlogs, deleteBlog } from '../models/blogModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Obtener todos los blogs con filtrado opcional por title o author
router.get('/', async (req, res) => {
  const search = req.query.search || '';

  try {
    const blogs = await getBlogs(search);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los blogs' });
  }
});

// Crear un nuevo blog (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
  const { title, author, url } = req.body;
  const userId = req.user.id;

  if (!title || !url) {
    return res.status(400).json({ error: 'El título y la URL son obligatorios' });
  }

  try {
    const newBlog = await createBlog(title, author, url, userId);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el blog' });
  }
});

// Eliminar un blog (solo si el usuario lo creó)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedBlog = await deleteBlog(id, userId);
    if (!deletedBlog) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este blog' });
    }
    res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el blog' });
  }
});

export default router;
