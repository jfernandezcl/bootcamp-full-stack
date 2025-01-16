import pool from '../db/index.js';

// Obtener todos los blogs
export const getBlogs = async (req, res) => {
  const result = await pool.query('SELECT * FROM blogs');
  res.status(200).json(result.rows);
};

// Crear un nuevo blog
export const createBlog = async (req, res) => {
  const { author, title, url, likes } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: 'El título y la URL son obligatorios' });
  }

  const result = await pool.query(
    'INSERT INTO blogs (author, title, url, likes) VALUES ($1, $2, $3, $4) RETURNING *',
    [author, title, url, likes || 0]
  );

  res.status(201).json(result.rows[0]);
};

// Eliminar un blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Blog no encontrado' });
  }

  res.status(200).json({ message: 'Blog eliminado' });
};

// Actualizar los likes de un blog
export const updateLikes = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (likes === undefined || typeof likes !== 'number') {
    return res.status(400).json({ error: 'Debe proporcionar un número válido de likes' });
  }

  const result = await pool.query(
    'UPDATE blogs SET likes = $1 WHERE id = $2 RETURNING *',
    [likes, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Blog no encontrado' });
  }

  res.status(200).json(result.rows[0]);
};
