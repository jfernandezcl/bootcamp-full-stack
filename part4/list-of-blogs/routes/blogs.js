const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;


  if (!title || !author || !url) {
    return res.status(400).json({ error: 'Title, author, and url are required' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  try {
    const saveBlog = await blog.save();
    res.status(201).json(saveBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error saving blog' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleteBlog = await Blog.findByIdAndDelete(id)

    if (!deleteBlog) {
      return res.status(404)
    }

    res.status(201).end()

  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { likes } = req.body

  if (likes === undefined) {
    return res.status(400).json({ error: 'Likes are required' })
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    )

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.status(200).json(updatedBlog)
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog' })
  }
})

module.exports = router;
