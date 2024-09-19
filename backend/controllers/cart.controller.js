const cardService = require('../services/cart.services');

async function handleAddCartItem(req, res) {
    try {
        const { cardName, userId, guestId } = req.body; // Lấy `guestId` từ request
        const result = await cardService.addCartItem(cardName, userId, guestId); // Truyền `guestId` vào
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    handleAddCartItem,
};
