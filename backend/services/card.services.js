const cardResponseTemplate = require('../utils/responses/card.response');
const db = require('../sequelize/database.js');

const addCardPoints = async (CardObject) => {
  try {
    if (!CardObject.card.cardName) {
      return { success: false, message: 'Yêu cầu phải có mã thẻ' };
    }
    if (!CardObject.card.walletId) {
      return { success: false, message: 'Yêu cầu phải có ID của ví' };
    }
    const card = await db.Card.findOne({ where: { name: CardObject.card.cardName } });

    if (!card) {
      throw new Error('Không tìm thấy thẻ !');
    }
    if (card.status !== 'Đã kích hoạt') {
      throw new Error('Thẻ chưa được kích hoạt hoặc đã nạp !');
    }
    if (card.validTo < new Date()) {
      throw new Error('Thẻ đã hết hạn !');
    }
    const userWallet = await db.Wallet.findOne({ where: { userId: CardObject.card.walletId } });
    if (!userWallet) {
      throw new Error('Không tìm thấy ví của người dùng !');
    } else {
      await card.update({ status: 'Đã nạp', walletId: userWallet.id });
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
    const card = await db.Card.findAll({ where: { walletId: userWallet.id, status: 'Đã nạp' } });
    if (!card) {
      throw new Error('Không tìm thấy thẻ !');
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
