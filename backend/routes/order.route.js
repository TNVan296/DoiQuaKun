const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticateToken } = require('../middlewares/authenticateToken.middleware');

/**
 * @swagger
 * /api/order/completed:
 *   get:
 *     summary: Get completed order
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Get completed order successfully
 *       400:
 *         description: Failed to get completed order
 */
router.get('/completed', authenticateToken, orderController.getOrder);

/**
 * @swagger
 * /api/order/completed/{cartId}:
 *   get:
 *     summary: Get order products
 *     tags:
 *       - Order
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của giỏ hàng
 *     responses:
 *       200:
 *         description: Get completed order successfully
 *       400:
 *         description: Failed to get completed order
 */
router.get('/completed/:cartId', authenticateToken, orderController.getOrderProductsById);

module.exports = router;