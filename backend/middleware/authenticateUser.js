const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Lấy token từ header
  const token = req.headers['authorization']?.split(' ')[1]; // Xử lý dạng "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Kiểm tra token
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Lưu thông tin người dùng vào req để sử dụng trong các route tiếp theo
    req.user = decoded;

    // Tiếp tục đến middleware hoặc route tiếp theo
    next();
  });
};

module.exports = authenticateUser;
