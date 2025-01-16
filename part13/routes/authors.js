import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';
import dotenv from 'dotenv';
import { getAuthorsStats } from '../models/authorModelQuantity.js';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const authors = await getAuthorsStats();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las estadísticas de los autores' });
  }
});


// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
