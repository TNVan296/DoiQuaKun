const cardService = require('../services/card.services');

const handleAddCardPoints = async (req, res) => {
  try {
    const CardObject = {
      card: req.body,
    }
    const result = await cardService.addCardPoints(CardObject);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getCardHistory = async (req, res) => {
  try {
    const CardObject = {
      card: req.user,
    }
    const result = await cardService.getCardHistory(CardObject);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
  
module.exports = {
  handleAddCardPoints,
  getCardHistory
};
