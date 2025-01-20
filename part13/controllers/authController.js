import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../models/userModel.js';
import { createSession } from '../models/sessionModel.js';

// Iniciar sesión y crear una sesión activa
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (!user || user.disabled) {
      return res.status(401).json({ error: 'Usuario deshabilitado o incorrecto' });
    }

    // Verificar contraseña (aquí deberías usar un hash y comparar)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear el token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Crear sesión activa
    await createSession(user.id, token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
