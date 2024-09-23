const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/file.controller');


/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a file
 *     description: API để upload file lên server và lưu thông tin vào cơ sở dữ liệu
 *     tags: [File]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Upload file thành công
 *                 file:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     path:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Upload file thất bại
 */
router.post('/upload', uploadFile);

module.exports = router;
