import express from 'express';
import { invalidateSession } from '../models/sessionModel.js';

const router = express.Router();

// Cerrar sesión (invalidar sesión)
router.delete('/logout', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ error: 'No se proporcionó un token' });
  }

  try {
    // Invalidar la sesión
    const result = await invalidateSession(token);

    if (result) {
      res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } else {
      res.status(400).json({ error: 'No se pudo cerrar sesión' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
});

export default router;
