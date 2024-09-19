const express = require('express');
const router = express.Router();
const { sendOtpToEmail, verifyOtp } = require('../controllers/user.controller');

/**
 * @swagger
 * /api/users/sendOtp:
 *   post:
 *     summary: Send OTP
 *     description: User submits email
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
 *         description: OTP sent
 *       400: 
 *         description: Invalid email format
 *       500:
 *         description: Failed to send OTP
 */

// Route gửi OTP qua email
router.post('/sendOtp', sendOtpToEmail);

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
