// controllers/blogsController.js
const Blog = require('../models/blog');
const User = require('../models/user');

const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body;
  const user = req.user

  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required to create a blog' })
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el blog' });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: 'Error al recuperar los blogs' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = (req.params.id)
    const user = req.user

    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to delete this blog' })
    }

    await Blog.findByIdAndDelete(blogId)
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: 'Error when trying to delete the blog' })
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (likes === undefined) {
    return res.status(400).json({ error: 'Se requiere la cantidad de likes' });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog no encontrado' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el blog' });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog
};
