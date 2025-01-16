import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByUsername } from '../models/userModel.js';

const router = express.Router();

router.post('/', async (req, res) => { // NUEVO
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });

  const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, username: user.username, name: user.name });
});

export default router;
