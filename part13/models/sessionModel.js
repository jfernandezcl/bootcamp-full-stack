import pool from '../db/index.js';

// Crear una nueva sesión
export const createSession = async (userId, token) => {
  const result = await pool.query(
    'INSERT INTO sessions (user_id, token) VALUES ($1, $2) RETURNING *',
    [userId, token]
  );
  return result.rows[0];
};

// Verificar si el token es válido
export const verifySession = async (token) => {
  const result = await pool.query(
    'SELECT * FROM sessions WHERE token = $1 AND valid = true',
    [token]
  );
  return result.rows[0]; // Devuelve la sesión activa o null
};

// Invalidar una sesión
export const invalidateSession = async (token) => {
  const result = await pool.query(
    'UPDATE sessions SET valid = false WHERE token = $1 RETURNING *',
    [token]
  );
  return result.rows[0]; // Devuelve la sesión invalidada
};
