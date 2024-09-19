const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints for managing the shopping cart.
 *
 * /cart:
 *   post:
 *     summary: Add points to a cart item.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardName:
 *                 type: string
 *                 description: The name of the card to be added to the cart.
 *                 example: "Gift Card"
 *               userId:
 *                 type: string
 *                 description: The ID of the logged-in user. (Optional)
 *                 example: "user123"
 *               guestId:
 *                 type: string
 *                 description: The ID of the guest user. (Optional)
 *                 example: "guest456"
 *     responses:
 *       200:
 *         description: Successfully added card points to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartItem:
 *                   type: object
 *                   description: The cart item added or updated.
 *                 guestId:
 *                   type: string
 *                   description: The guest ID if applicable.
 *       400:
 *         description: Bad request. The input data is invalid or missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Sản phẩm không tồn tại."
 *
 */
router.post('/cart', cartController.handleAddCartItem);

module.exports = router;
