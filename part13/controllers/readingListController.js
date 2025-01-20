import pool from '../db/index.js';

// Marcar un blog en la lista de lectura como leído
export const markAsRead = async (req, res) => {
  const { id } = req.params; // ID del registro en la tabla reading_lists
  const { read } = req.body;
  const userId = req.user.id; // Usuario autenticado desde el token

  if (typeof read !== 'boolean') {
    return res.status(400).json({ error: 'El campo "read" debe ser booleano' });
  }

  try {
    // Verificar si el blog en la lista de lectura pertenece al usuario
    const checkResult = await pool.query(
      'SELECT * FROM reading_lists WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rowCount === 0) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar este blog' });
    }

    // Actualizar el estado de lectura
    const result = await pool.query(
      'UPDATE reading_lists SET read = $1 WHERE id = $2 RETURNING *',
      [read, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la lista de lectura' });
  }
};
