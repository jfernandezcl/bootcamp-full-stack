const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (req, res, next) => {
  const token = req.token

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return res.status(401).json({ error: 'Invalid or missing token' })
      }

      const user = await User.findById(decodedToken.id)
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
      req.user = user
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'Missing token' })
  }
  next()
}

module.exports = userExtractor