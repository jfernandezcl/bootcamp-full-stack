import pool from '../db/index.js';

export const createBlog = async (title, author, url, userId) => { // NUEVO
  const result = await pool.query(
    'INSERT INTO blogs (title, author, url, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, url, userId]
  );
  return result.rows[0];
};

export const getBlogs = async () => { // NUEVO
  const result = await pool.query(
    `SELECT blogs.*, users.name AS user_name, users.username AS user_email 
     FROM blogs JOIN users ON blogs.user_id = users.id`
  );
  return result.rows;
};
