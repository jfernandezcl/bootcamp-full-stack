import ReadingList from '../models/readingList.js';
import ReadingList from '../models/readingList.js';

// Agregar un blog a la lista de lectura
export const addToReadingList = async (req, res) => {
  try {
    const { blogId, userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).json({ error: 'BlogId y UserId son obligatorios' });
    }

    const entry = await ReadingList.create({ blog_id: blogId, user_id: userId });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar a la lista de lectura' });
  }
};
// Obtener la lista de lectura de un usuario
export const getReadingList = async (req, res) => {
  try {
    const { user_id } = req.params;
    const list = await ReadingList.findAll({ where: { user_id } });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar la lista de lectura' });
  }
};

// Marcar un blog como leído
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await ReadingList.findByPk(id);

    if (!entry) {
      return res.status(404).json({ error: 'Entrada no encontrada' });
    }

    entry.read = true;
    await entry.save();

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado de lectura' });
  }
};

