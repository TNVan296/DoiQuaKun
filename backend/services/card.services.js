const cardResponseTemplate = require('../utils/responses/card.response');
const db = require('../sequelize/database.js');

const addCardPoints = async (CardObject) => {
  try {
    if (!CardObject.card.cardName) {
      return { success: false, message: 'Card name is required' };
    }
    if (!CardObject.card.walletId) {
      return { success: false, message: 'Wallet Id is required' };
    }
    const card = await db.Card.findOne({ where: { name: CardObject.card.cardName } });

    if (!card) {
      throw new Error('Card not found');
    }
    if (card.status !== 'active') {
      throw new Error('Card is not active');
    }
    const userWallet = await db.Wallet.findOne({ where: { userId: CardObject.card.walletId } });
    if (!userWallet) {
      throw new Error('Wallet not found');
    } else {
      await card.update({ status: 'inactive', walletId: userWallet.id });
      console.log('vao day')
      await userWallet.increment({ points: card.points });
      return cardResponseTemplate(card);
    }
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
