import Blog from '../models/blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, author, url, year } = req.body;
    const newBlog = await Blog.create({ title, author, url, year });
    res.status(201).json(newBlog);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
