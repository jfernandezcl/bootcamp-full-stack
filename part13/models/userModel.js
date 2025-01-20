import pool from '../db/index.js';

export const getUserByUsername = async (username) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0]; // Devuelve el usuario o null
};

export const toggleUserStatus = async (userId, status) => {
  const result = await pool.query(
    'UPDATE users SET disabled = $1 WHERE id = $2 RETURNING *',
    [status, userId]
  );
  return result.rows[0];
};

// Crear un nuevo usuario
export const createUser = async (name, username) => {
  const result = await pool.query(
    'INSERT INTO users (name, username) VALUES ($1, $2) RETURNING *',
    [name, username]
  );
  return result.rows[0];
};

// Obtener todos los usuarios con sus blogs asociados
export const getUsers = async () => {
  const result = await pool.query(
    `SELECT users.*, 
            COALESCE(json_agg(blogs) FILTER (WHERE blogs.id IS NOT NULL), '[]') AS blogs 
     FROM users 
     LEFT JOIN blogs ON users.id = blogs.user_id 
     GROUP BY users.id`
  );
  return result.rows;
};

// Obtener un usuario por ID con su lista de lectura
export const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT users.id, users.name, users.username,
            COALESCE(json_agg(
              DISTINCT jsonb_build_object(
                'id', blogs.id,
                'url', blogs.url,
                'title', blogs.title,
                'author', blogs.author,
                'likes', blogs.likes,
                'year', blogs.year,
                'readinglists', jsonb_build_object(
                  'id', reading_lists.id,
                  'read', reading_lists.read
                )
              )
            ) FILTER (WHERE blogs.id IS NOT NULL), '[]') AS readings
     FROM users
     LEFT JOIN reading_lists ON users.id = reading_lists.user_id
     LEFT JOIN blogs ON reading_lists.blog_id = blogs.id
     WHERE users.id = $1
     GROUP BY users.id;`,
    [id]
  );

  return result.rows[0];
};

// Actualizar el nombre de usuario
export const updateUsername = async (oldUsername, newUsername) => {
  const result = await pool.query(
    'UPDATE users SET username = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2 RETURNING *',
    [newUsername, oldUsername]
  );
  return result.rows[0];
};
