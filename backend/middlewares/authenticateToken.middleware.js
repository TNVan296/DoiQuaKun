const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const db = require('../sequelize/database.js');

// Middleware xác thực JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    const loggedUser = await db.User.findOne({ where: { email: user.email } });
    req.user = loggedUser;
    next();
  });
};

module.exports = { authenticateToken }