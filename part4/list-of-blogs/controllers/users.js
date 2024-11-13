const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const getUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

const createUsers = async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
}

module.exports = { getUsers, createUsers }