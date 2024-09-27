const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card.controller');
const { authenticateToken } = require('../middlewares/authenticateToken.middleware');

/**
 * @swagger
 * /api/cards/recharge:
 *   post:
 *     summary: Add points to a user's wallet using a card
 *     description: Adds points from an active card to the wallet of the user. The card's status is updated to 'Inactive'.
 *     tags:
 *       - Cards
 *     requestBody:
 *       description: Card name to add points to the wallet.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardName:
 *                 type: string
 *                 description: The name of the card.
 *                 example: 'DQK_01'
 *     responses:
 *       200:
 *         description: Points added to wallet successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Points added to wallet successfully'
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Card not found'
 *       401:
 *         description: Unauthorized if token is invalid or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'No token provided'
 *                   # Removed the repeated example entry
 */
router.post('/recharge', authenticateToken, cardController.handleAddCardPoints);

/**
 * @swagger
 * /api/cards/history:
 *   get:
 *     summary: Get card history
 *     tags:
 *       - Cards
 *     responses:
 *       200:
 *         description: Card history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cardName:
 *                     type: string
 *                     example: 'DQK_'
 *                   points:
 *                     type: integer
 *                     example: 100
 *                   status:
 *                     type: string
 *                     example: 'Active'
 *       401:
 *         description: Unauthorized if token is invalid or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'No token provided'
 *                   # Removed the repeated example entry
 *       404:
 *         description: Card not found
 */

router.get('/history', authenticateToken, cardController.getCardHistory);

module.exports = router;
