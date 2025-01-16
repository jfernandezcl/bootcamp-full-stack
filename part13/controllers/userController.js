
import { createUser, getUsers, updateUsername } from '../models/userModel.js';

// Crear un nuevo usuario
export const addUser = async (req, res) => {
  const { name, username } = req.body;
  if (!name || !username) {
    return res.status(400).json({ error: 'El nombre y el nombre de usuario son obligatorios' });
  }

  try {
    const user = await createUser(name, username);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
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
