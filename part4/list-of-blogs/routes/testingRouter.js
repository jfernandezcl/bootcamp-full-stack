const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

testingRouter.post('/reset', async (req, res) => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error resetting the database' });
  }
});

module.exports = testingRouter;
