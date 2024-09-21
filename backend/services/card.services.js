const cardResponseTemplate = require('../utils/responses/card.response');
const db = require('../sequelize/database.js');

const addCardPoints = async (cardName, userId) => {
  try {
    const card = await db.Card.findOne({ where: { name: cardName } });

    if (!card) {
      throw new Error('Card not found');
    }

    if (card.status !== 'active') {
      throw new Error('Card is not active');
    }

    const wallet = await db.Wallet.findOne({ where: { userId: userId } });

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

module.exports = {
  addCardPoints
};
