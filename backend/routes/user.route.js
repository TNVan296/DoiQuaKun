const express = require('express');
const router = express.Router();
const {
  register,
  login,
  // getOtp,
  verifyOtp,
  getProfileUser,
  updateProfileUser
} = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/authenticateToken.middleware');


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

// /**
//  * @swagger
//  * /api/users/getOtp:
//  *   post:
//  *     summary: Get OTP
//  *     description: User submits email
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: thuong4g@gmail.com
//  *     responses:
//  *       200:
//  *         description: OTP created
//  *       400:
//  *         description: Invalid email format
//  */

// // Route tạo OTP
// router.post('/getOtp', getOtp)

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

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid or missing access token.
 */

// Route xem profile user
router.get('/profile', authenticateToken, getProfileUser);


/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile of the authenticated user.
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
 *                 example: Nguyễn Gia Thưởng
 *               email:
 *                 type: string
 *                 example: thuong4g@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: 0935542939
 *               detailAddress:
 *                 type: string
 *                 example: Đồng Tâm
 *               cityAddress:
 *                 type: string
 *                 example: TP. HCM
 *               wardAddress:
 *                 type: string
 *                 example: P. Trung Mỹ Tây
 *               districtAddress:
 *                 type: string
 *                 example: Q.12
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *       400:
 *         description: Invalid request body.
 */

// Route cập nhật profile user
router.put('/profile', authenticateToken, updateProfileUser);

module.exports = router;
