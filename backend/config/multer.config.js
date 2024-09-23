const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Thư mục để lưu file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Cho phép upload nhiều file (tối đa 50 file cùng lúc)
const upload = multer({ storage }).array('files', 100);

module.exports = {
  upload,
};
