import express from 'express';
import { getBlogs, createBlog, deleteBlog, updateLikes } from '../controllers/blogsController.js';

const router = express.Router();

// Ruta GET para obtener todos los blogs
router.get('/', getBlogs);

// Ruta POST para agregar un nuevo blog
router.post('/', createBlog);

// Ruta DELETE para eliminar un blog por ID
router.delete('/:id', deleteBlog);

// Ruta PUT para actualizar los likes de un blog
router.put('/:id', updateLikes);

export default router;
