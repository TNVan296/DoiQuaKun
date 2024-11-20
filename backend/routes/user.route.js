const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyOtp,
  getProfileUser,
  updateProfileUser,
  getCardHistory,
  getHistoryExchange
} = require('../controllers/user.controller');
const { authenticateToken, generateRefreshToken } = require('../middlewares/authenticateToken.middleware');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Đăng ký người dùng mới
  *     tags:
 *       - Users
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
  *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: thuong4g@gmail.com
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
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: thuong4g@gmail.com
 *               otp:
 *                 type: integer
 *                 example: 379474
 *     responses:
 *       200:
 *         description: Xác thực OTP thành công
 *       400:
 *         description: OTP không hợp lệ
*/
router.post('/verifyOtp', verifyOtp);

/**
 * @swagger
 * /api/users/token:
 *   post:
 *     summary: Tái tạo Access Token
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5..."
 *     responses:
 *       200:
 *         description: Access Token được tái tạo thành công
 *       401:
 *         description: Refresh Token không hợp lệ
 *       403:
 *         description: Refresh Token đã hết hạn hoặc không hợp lệ
 */
router.post('/token', generateRefreshToken)

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
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Trà
 *               email:
 *                 type: string
 *                 example: thuong4g@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: "0909123456"
 *               detailAddress:
 *                 type: string
 *                 example: "123 Nguyễn Trãi"
 *               cityId:
 *                 type: integer
 *                 example: 1
 *               wardId:
 *                 type: string
 *                 example: 1
 *               districtId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Cập nhật profile thành công
 *       400:
 *         description: Lỗi khi cập nhật profile
 */
router.put('/profile', authenticateToken, updateProfileUser);

/**
 * @swagger
 * /api/users/cardHistory:
 *   get:
 *     summary: Lấy ra lịch sử nạp thẻ tích lũy của người dùng
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lấy ra lịch sử nạp thẻ thành công
 *       401:
 *         description: Không có quyền truy cập
 */

router.get('/cardHistory', authenticateToken, getCardHistory);

/**
 * @swagger
 * /api/users/cartHistory:
 *   get:
 *     summary: Lấy ra lịch sử đổi quà của người dùng
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lấy ra lịch sử đổi quà thành công
 *       401:
 *         description: Không có quyền truy cập
 */

router.get('/cartHistory', authenticateToken, getHistoryExchange);

module.exports = router;
