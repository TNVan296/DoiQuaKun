const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../middleware/upload.middleware');

const FileController = require("../controllers/file.controller");

router.post("/", uploadMiddleware, FileController.upload);
router.get("/", FileController.getListFiles);

module.exports = router;