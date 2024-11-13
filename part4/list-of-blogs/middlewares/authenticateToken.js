const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'token missing' })
  }

  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'token invalid' })
    }
    res.user = decodedToken
    next()
  })
}

module.exports = authenticateToken 