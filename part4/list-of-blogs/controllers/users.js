const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1 })
    res.json(users)
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving users' })
  }
}

const createUsers = async (req, res) => {
  const { username, name, password } = req.body

  if (!username || username.length < 3) {
    return res.status(400).json({ error: 'username must be at least 3 characters long' })
  }

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
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