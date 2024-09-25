const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyOtp,
  getProfileUser,
  updateProfileUser
} = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/authenticateToken.middleware');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@example.com
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi khi đăng ký
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@example.com
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Lỗi đăng nhập
 */
router.post('/login', login);

/**
 * @swagger
 * /api/users/verifyOtp:
 *   post:
 *     summary: Xác thực OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@example.com
 *               otp:
 *                 type: integer
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Xác thực OTP thành công
 *       400:
 *         description: OTP không hợp lệ
 */
router.post('/verifyOtp', verifyOtp);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Lấy profile người dùng
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lấy profile thành công
 *       401:
 *         description: Không có quyền truy cập
 */
router.get('/profile', authenticateToken, getProfileUser);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Cập nhật profile người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 example: "0909123456"
 *               detailAddress:
 *                 type: string
 *                 example: "123 Nguyễn Trãi"
 *               cityAddress:
 *                 type: string
 *                 example: "TP. Hồ Chí Minh"
 *               wardAddress:
 *                 type: string
 *                 example: "Phường 1"
 *               districtAddress:
 *                 type: string
 *                 example: "Quận 1"
 *     responses:
 *       200:
 *         description: Cập nhật profile thành công
 *       400:
 *         description: Lỗi khi cập nhật profile
 */
router.put('/profile', authenticateToken, updateProfileUser);


module.exports = router;
