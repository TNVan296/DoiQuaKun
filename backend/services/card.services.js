const db = require('../sequelize/database');
const { Op } = require('sequelize');

// Thêm điểm vào ví
const addCardPoints = async (cardName, userId) => {
  try {
    // Tìm thẻ theo tên
    const card = await db.cards.findOne({ where: { name: cardName } });

    if (!card) {
      throw new Error('Card not found');
    }
    
    // Log trạng thái của thẻ
    console.log('Card:', card);

    if (card.status !== 'active') {
      throw new Error('Card is not active');
    }

    // Tìm ví tiền của người dùng
    const wallet = await db.wallets.findOne({ where: { userId: userId } });

    if (!wallet) {
      throw new Error('Wallet not found');
    }
    
    // Log ví tiền và điểm hiện tại
    console.log('Wallet:', wallet);

    // Cập nhật trạng thái của thẻ
    await card.update({ status: 'inactive' });

    // Cập nhật điểm trong ví tiền
    await wallet.increment({ points: card.points });

    return {
      success: true,
      message: 'Points added to wallet successfully'
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCardPoints
};
