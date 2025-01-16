import pool from '../db/index.js';

export const createBlog = async (title, author, url, userId) => {
  const result = await pool.query(
    'INSERT INTO blogs (title, author, url, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, url, userId]
  );
  return result.rows[0];
};

// Obtener blogs con filtrado por palabra clave en el título (MODIFICADO)
export const getBlogs = async (search) => {
  let query = `
    SELECT blogs.*, 
           json_build_object('id', users.id, 'name', users.name, 'username', users.username) AS user 
    FROM blogs 
    JOIN users ON blogs.user_id = users.id
  `;

  const params = [];

  if (search) {
    query += ` WHERE LOWER(blogs.title) LIKE $1`;
    params.push(`%${search.toLowerCase()}%`);
  }

  const result = await pool.query(query, params);
  return result.rows;
};

export const getBlogById = async (id) => {
  const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
  return result.rows[0];
};

export const deleteBlog = async (id, userId) => {
  const blog = await getBlogById(id);
  if (!blog) return null;

  if (blog.user_id !== userId) {
    throw new Error('No tienes permiso para eliminar este blog');
  }

  const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
