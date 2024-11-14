const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    req.userId = decodedToken.id
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }

}

module.exports = authenticateToken 