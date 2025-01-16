import User from '../models/userModel.js';
import { createUser, getUsers, updateUsername } from '../models/userModel.js';

// Crear un nuevo usuario
export const addUser = async (req, res, next) => {
  try {
    const { name, username } = req.body;
    if (!name || !username) {
      return res.status(400).json({ error: ['El nombre y el correo electrónico son obligatorios'] });
    }

    const user = await User.create({ name, username });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los usuarios
export const listUsers = async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
};

// Actualizar el nombre de usuario
export const changeUsername = async (req, res) => {
  const { username } = req.params;
  const { newUsername } = req.body;

  if (!newUsername) {
    return res.status(400).json({ error: 'Debe proporcionar un nuevo nombre de usuario' });
  }

  try {
    const updatedUser = await updateUsername(username, newUsername);
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};
