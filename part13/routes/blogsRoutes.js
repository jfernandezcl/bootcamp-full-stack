import express from 'express';
import pool from '../db/index.js';  // Importa la conexión con la base de datos

const router = express.Router();

// Ruta GET para obtener todos los blogs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener blogs:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta POST para agregar un nuevo blog
router.post('/', async (req, res) => {
  const { author, title, url, likes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO blogs (author, title, url, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      [author, title, url, likes || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar el blog:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta DELETE para eliminar un blog por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog no encontrado' });
    }
    res.status(200).json({ message: 'Blog eliminado' });
  } catch (error) {
    console.error('Error al eliminar el blog:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
