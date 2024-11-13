const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router('/', usersController.getUsers)
router.post('/', usersController.createUsers)

module.exports = router