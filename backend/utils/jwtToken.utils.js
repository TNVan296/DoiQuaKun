const jwt = require('jsonwebtoken')

// Tạo JWT
const accessToken = (user, secretKey) => {
  return jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
}

module.exports = {
  accessToken
};