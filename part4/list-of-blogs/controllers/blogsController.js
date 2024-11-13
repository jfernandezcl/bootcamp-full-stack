const Blog = require('../models/blog')
const User = require('../models/user')

const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body

  const user = await User.findOne()

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el blog' })
  }
}

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
  } catch (error) {
    res.status(400).json({ error: 'Error al recuperar los blogs' })
  }
}


module.exports = {
  createBlog,
  getBlogs
}