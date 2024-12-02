const cardResponseTemplate = require('../utils/responses/card.response');
const db = require('../sequelize/database.js');

const addCardPoints = async (CardObject) => {
  try {
    if (!CardObject.card.cardName || !CardObject.card.userId) {
      return { success: false, message: 'Yêu cầu phải có mã thẻ và có ID của người dùng' };
    }
    const card = await db.Card.findOne({ where: { name: CardObject.card.cardName } });

    if (!card) {
      return { success: false, message: 'Không tìm thấy thẻ !' };
    }
    if (card.status !== 'Đã kích hoạt') {
      return { success: false, message: 'Thẻ chưa được kích hoạt hoặc đã nạp !' };
    }
    if (card.validTo < new Date()) {
      return { success: false, message: 'Thẻ đã hết hạn !' };
    }
    const userWallet = await db.Wallet.findOne({ where: { userId: CardObject.card.userId } });
    if (!userWallet) {
      return { success: false, message: 'Không tìm thấy ví của người dùng !' };
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
