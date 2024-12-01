const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authenticateToken } = require('../middlewares/authenticateToken.middleware');

/**
 * @swagger
 * /api/cart/:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *       400:
 *         description: Failed to retrieve cart items
 */

router.get('/', authenticateToken, cartController.getCart);

/**
 * @swagger
 * /api/cart/points:
 *   get:
 *     summary: Get cart points
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart points retrieved successfully
 *       400:
 *         description: Failed to retrieve cart points
 */

router.get('/points', authenticateToken, cartController.getCartPoints);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Failed to add item to cart
 */
router.post('/add', authenticateToken, cartController.handleAddCartItem);

/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       400:
 *         description: Failed to remove item from cart
 */
router.post('/remove', authenticateToken, cartController.handleRemoveCartItem);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               babyName:
 *                 type: string
 *                 example: "Nhung"
 *               babyAge:
 *                 type: integer
 *                 example: 12
 *               babyGender:
 *                 type: boolean
 *                 example: false
 *               detailAddress:
 *                 type: string
 *                 example: "123 Nguyễn Trãi"
 *     responses:
 *       200:
 *         description: Checkout successful
 *       400:
 *         description: Checkout failed
 */
router.post('/checkout', authenticateToken, cartController.handleCheckout);

module.exports = router;