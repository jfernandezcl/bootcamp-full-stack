import User from '../models/userModel.js';
import { createUser, getUsers, updateUsername } from '../models/userModel.js';
import ReadingList from '../models/readingListModel.js';
import Blog from '../models/blogModel.js';

// Obtener un usuario por ID con su lista de lectura
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'username'],
      include: {
        model: ReadingList,
        attributes: ['id'],
        include: {
          model: Blog,
          attributes: ['id', 'url', 'title', 'author', 'likes', 'year']
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Formatear la respuesta para que devuelva solo la lista de blogs
    const formattedUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      readings: user.ReadingLists.map(entry => entry.Blog) // Extraer solo los blogs de la lista de lectura
    };

    res.json(formattedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar el usuario' });
  }
};
