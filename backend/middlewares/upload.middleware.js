require('dotenv').config();
const util = require("util");
const multer = require("multer");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const maxSize = process.env.MAX_FILE_SIZE * 1024 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (process.env.ENV == 'production') {
      cb(null, path.join(process.env.PRODUCT_MEDIA_DIR));
    } else {
      cb(null, __basedir + "/media/uploads/");
    }
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    cb(null, newFilename);

  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadMiddleware = util.promisify(uploadFile);
module.exports = uploadMiddleware;
