const express = require('express');
const router = express.Router();
const MLTeachController = require('../controller/MLTeach.controller');

/**
 * @swagger
 * /MLteach:
 *   get:
 *     summary: Returns a hello message
 *     description: Use to request a hello message
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/', MLTeachController.getHello);

/**
 * @swagger
 * /user/login:
 *   get:
 *     summary: Log in user and authenticate
 *     description: Use to log in to exchange product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: 0988676745
 *                 description: Phone number of user
 *     responses:
 *       200:
 *         description: Log in success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: 'Token to authenticate'
 *       401:
 *         description: Log in failed
*/

router.post('/user/login', (req, res) => {
  const { phoneNumber } = req.body;

  const authenticateCode = Math.floor(1000 + Math.random() * 9000);
  console.log(authenticateCode);

  // kiểm tra đơn giản trước khi đưa khâu xác thực từ email vào
  if (phoneNumber) {
    return res.status(200).json({
      token: 'Token to authenticate',
      authenticateCode
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Phonenumber is invalid'
    })
  }
  
});

module.exports = router;
