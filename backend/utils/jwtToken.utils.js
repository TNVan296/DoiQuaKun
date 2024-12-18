const jwt = require('jsonwebtoken')

// Tạo Access Token
const createAccessToken = (user, secretKey) => {
  return jwt.sign({ email: user.email }, secretKey, { expiresIn: '1m' });
}
// Tạo Refresh Token
const createRefreshToken = (user, secretKey) => {
  return jwt.sign({ email: user.email }, secretKey, { expiresIn: '7d' });
}

module.exports = {
  createAccessToken,
  createRefreshToken
};