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

module.exports = router;
