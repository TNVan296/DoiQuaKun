const express = require('express');
const router = express.Router();
const { register, login, profileUser } = require('../controllers/login.controller');
const { authenticateToken } = require('../middleware/authenticateToken.middleware');

/**
 * @swagger
 * /api/login
 *   post:
 *     summary: Login
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: thuong4g
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400: 
 *         description: Invalid username
 *       500:
 *         description: Failed to login
 */

// Route Login
router.post('/login', login);

/**
 * @swagger
 * /api/register
 *   post:
 *     summary: Register
 *     description: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: thuong4g
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Register successful
 *       400: 
 *         description: Invalid username
 *       500:
 *         description: Failed to register
 */

// Route Register
router.post('/register', register);

// Rout lấy thông tin người dùng từ accessToken
router.get('/profile', authenticateToken, profileUser);


module.exports = router;
