import pool from '../db/index.js';

export const getBlogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener blogs:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createBlog = async (req, res) => {
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
};

export const deleteBlog = async (req, res) => {
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
};
