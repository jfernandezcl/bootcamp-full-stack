import jwt from 'jsonwebtoken';
import { verifySession } from '../models/sessionModel.js';
import { getUserByUsername } from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
  }

  try {
    // Verificar la validez del token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si la sesión sigue activa
    const session = await verifySession(token);

    if (!session) {
      return res.status(401).json({ error: 'Sesión no válida o caducada' });
    }

    // Verificar si el usuario está deshabilitado
    const user = await getUserByUsername(decoded.username);

    if (user.disabled) {
      return res.status(403).json({ error: 'Cuenta deshabilitada' });
    }

    req.user = decoded; // Guardar información del usuario en la solicitud
    next(); // Continuar con la solicitud
  } catch (error) {
    res.status(401).json({ error: 'Token no válido' });
  }
};
