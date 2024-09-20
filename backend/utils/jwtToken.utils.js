const jwt = require('jsonwebtoken')

// Tạo JWT
const accessToken = (user, secretKey) => {
  return jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
}

module.exports = {
  accessToken
};