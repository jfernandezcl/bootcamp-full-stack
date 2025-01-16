import pool from '../db/index.js';

export const createBlog = async (title, author, url, userId) => {
  const result = await pool.query(
    'INSERT INTO blogs (title, author, url, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, url, userId]
  );
  return result.rows[0];
};

// Obtener todos los blogs con la información del usuario que los creó (MODIFICADO)
export const getBlogs = async () => {
  const result = await pool.query(
    `SELECT blogs.*, 
            json_build_object('id', users.id, 'name', users.name, 'username', users.username) AS user 
     FROM blogs 
     JOIN users ON blogs.user_id = users.id`
  );
  return result.rows;
};

// Obtener un blog por ID
export const getBlogById = async (id) => {
  const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
  return result.rows[0];
};

// Eliminar un blog solo si el usuario es el creador (MODIFICADO)
export const deleteBlog = async (id, userId) => {
  const blog = await getBlogById(id);
  if (!blog) return null;

  if (blog.user_id !== userId) {
    throw new Error('No tienes permiso para eliminar este blog');
  }

  const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
