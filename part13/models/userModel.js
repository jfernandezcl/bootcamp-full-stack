import pool from '../db/index.js';
import bcrypt from 'bcryptjs'; // NUEVO

const isValidEmail = (email) => { // NUEVO
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const createUser = async (name, username, password) => { // NUEVO
  if (!name || !username || !password) throw new Error('El nombre, correo y contraseña son obligatorios');
  if (!isValidEmail(username)) throw new Error('El nombre de usuario debe ser un correo electrónico válido');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *',
    [name, username, hashedPassword]
  );
  return result.rows[0];
};

export const getUserByUsername = async (username) => { // NUEVO
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};
