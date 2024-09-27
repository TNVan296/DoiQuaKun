const cardResponseTemplate = require('../utils/responses/card.response');
const db = require('../sequelize/database.js');

const addCardPoints = async (CardObject) => {
  try {
    if (!CardObject.card.cardName) {
      return res.status(400).json({ message: 'Card name is required' });
    }
    if (!CardObject.card.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const card = await db.Card.findOne({ where: { name: CardObject.card.cardName } });

    if (!card) {
      throw new Error('Card not found');
    }
    if (card.status !== 'active') {
      throw new Error('Card is not active');
    }
    const wallet = await db.Wallet.findOne({ where: { userId: CardObject.card.userId } });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    await card.update({ status: 'inactive', walletId: wallet.id });
    await wallet.increment({ points: card.points });

    return cardResponseTemplate(card);
  } catch (error) {
    throw error;
  }
};

const getCardHistory = async (CardObject) => {
  try {
    const userWallet = await db.Wallet.findOne({ where: { userId: CardObject.card.id} });
    const card = await db.Card.findAll({ where: { walletId: userWallet.id, status: 'inactive' } });
    if (!card) {
      throw new Error('Card not found');
    }
    return cardResponseTemplate(card);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCardPoints,
  getCardHistory
};
