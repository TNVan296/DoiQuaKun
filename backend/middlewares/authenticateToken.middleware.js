const jwt = require('jsonwebtoken')
const db = require('../sequelize/database.js');
const { createAccessToken, createRefreshToken } = require('../utils/jwtToken.utils.js');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.AT_SECRET);
    const loggedUser = await db.User.findOne({ where: { email: decoded.email } });

    if (!loggedUser) {
      return res.status(403).json({ message: 'User not found' });
    }

    req.user = loggedUser;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

const generateRefreshToken = async (req, res) => {
  const { refreshToken: clientRefreshToken } = req.body;
  const decoded = jwt.decode(clientRefreshToken);

  if (!clientRefreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  if (!decoded || (decoded.exp && Date.now() >= decoded.exp * 1000)) {
    return res.status(401).json({ message: 'Refresh token has expired. Please log in again.' });
  }

  try {
    const decoded = jwt.verify(clientRefreshToken, process.env.RT_SECRET);
    const loggedUser = await db.User.findOne({ where: { email: decoded.email } });
    
    if (!loggedUser) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    
    // Tạo access token mới
    const newAccessToken = createAccessToken(loggedUser, process.env.AT_SECRET);

    // Tạo refresh token mới nếu cần (dài hạn)
    const newRefreshToken = createRefreshToken(loggedUser, process.env.RT_SECRET);

    // Lưu refresh token mới vào cơ sở dữ liệu (nếu refresh lại)
    loggedUser.refreshToken = newRefreshToken;
    await loggedUser.save();

    return res.status(200).send({ 
      message: 'Re-generate Access Token and Refresh Token successfully !',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

module.exports = { authenticateToken, generateRefreshToken };