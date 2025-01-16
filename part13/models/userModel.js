import pool from '../db/index.js';

// Crear un nuevo usuario
export const createUser = async (name, username) => {
  const result = await pool.query(
    'INSERT INTO users (name, username) VALUES ($1, $2) RETURNING *',
    [name, username]
  );
  return result.rows[0];
};

// Obtener todos los usuarios
export const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

// Actualizar el nombre de usuario
export const updateUsername = async (oldUsername, newUsername) => {
  const result = await pool.query(
    'UPDATE users SET username = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2 RETURNING *',
    [newUsername, oldUsername]
  );
  return result.rows[0];
};
