const cardService = require('../services/card.services');
async function handleAddCardPoints(req, res) {
    try {
        console.log('Request Body:', req.body); // Log dữ liệu nhận được

        const { cardName, userId } = req.body;

        if (!cardName) {
            return res.status(400).json({ message: 'Card name is required' });
        }

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const result = await cardService.addCardPoints(cardName, userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

  
module.exports = {
  handleAddCardPoints
};
