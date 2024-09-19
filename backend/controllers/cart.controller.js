const cardService = require('../services/cart.services');

async function handleAddCartItem(req, res) {
    try {
        const { cardName, userId, guestId } = req.body; 
        const result = await cardService.addCartItem(cardName, userId, guestId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    handleAddCartItem,
};
