import pool from '../db/index.js';

// Función para validar si el username es un email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Crear un nuevo usuario
export const createUser = async (name, username) => {
  if (!name || !username) {
    throw new Error('El nombre y el correo electrónico son obligatorios');
  }
  if (!isValidEmail(username)) {
    throw new Error('El nombre de usuario debe ser un correo electrónico válido');
  }

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
  if (!isValidEmail(newUsername)) {
    throw new Error('El nuevo nombre de usuario debe ser un correo electrónico válido');
  }

  const result = await pool.query(
    'UPDATE users SET username = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2 RETURNING *',
    [newUsername, oldUsername]
  );
  return result.rows[0];
};
