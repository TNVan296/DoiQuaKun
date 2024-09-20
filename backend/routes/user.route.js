const express = require('express');
const router = express.Router();
const { login, register, profileUser, verifyOtp } = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/authenticateToken.middleware');

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: User login
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
 *         description: Login successful
 *       400: 
 *         description: Invalid username
 *       500:
 *         description: Failed to login
 */

// Route gửi OTP qua email
router.post('/login', login);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register user
 *     description: User register
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
 *       201:
 *         description: User registered
 *       400: 
 *         description: User already exists
 */

// Route đăng ký user
router.post('/register', register);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: User profile
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */

// Route xem profile user
router.get('/profile', authenticateToken ,profileUser);

/**
 * @swagger
 * /api/users/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     description: User submits OTP
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
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified
 *       400:
 *         description: Invalid email format
 */

// Route xác thực OTP
router.post('/verifyOtp', verifyOtp);

module.exports = router;
