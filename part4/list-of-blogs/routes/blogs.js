// routers/blogs.js
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const authenticateToken = require('../middleware/authenticateToken');


router.get('/', blogsController.getBlogs);
router.post('/', authenticateToken, blogsController.createBlog);
router.delete('/:id', authenticateToken, blogsController.deleteBlog);
router.put('/:id', authenticateToken, blogsController.updateBlog);

module.exports = router;

