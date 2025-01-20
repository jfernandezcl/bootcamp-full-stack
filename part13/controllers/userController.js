import User from '../models/userModel.js';
import { getUsers, updateUsername } from '../models/userModel.js';
import ReadingList from '../models/readingListModel.js';
import Blog from '../models/blogModel.js';

// Obtener un usuario por ID con su lista de lectura y estado de lectura
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'username'],
      include: {
        model: Blog,
        attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        through: {
          model: ReadingList,
          attributes: ['id', 'read'] // Se obtiene el estado de lectura y la ID de la tabla de unión
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Formatear la respuesta para incluir el estado de lectura correctamente
    const formattedUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      readings: user.Blogs.map(blog => ({
        ...blog.toJSON(),
        readinglists: [
          {
            id: blog.ReadingList.id,
            read: blog.ReadingList.read
          }
        ]
      }))
    };

    res.json(formattedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar el usuario' });
  }
};
