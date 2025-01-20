import pool from '../db/index.js';

// Obtener un usuario con sus blogs en la lista de lectura
export const getUser = async (req, res) => {
  const { id } = req.params; // ID del usuario
  const { read } = req.query; // Filtro de lectura: 'true' o 'false'
  const userId = parseInt(id);

  try {
    // Base de la consulta para obtener los usuarios con sus blogs de la lista de lectura
    let query = `
      SELECT users.*, 
        COALESCE(json_agg(blogs) FILTER (WHERE blogs.id IS NOT NULL), '[]') AS blogs
      FROM users
      LEFT JOIN blogs ON users.id = blogs.user_id
      LEFT JOIN reading_lists ON reading_lists.blog_id = blogs.id AND reading_lists.user_id = users.id
      WHERE users.id = $1
    `;

    // Si se pasa el filtro de 'read', lo agregamos a la consulta
    if (read === 'true') {
      query += ' AND reading_lists.read = true';
    } else if (read === 'false') {
      query += ' AND reading_lists.read = false';
    }

    query += ' GROUP BY users.id';

    const result = await pool.query(query, [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario y los blogs' });
  }
};
