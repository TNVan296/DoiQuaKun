const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cart = sequelize.define(
    'Cart', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      total_items: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Cho phép null nếu đây là giỏ hàng của guest
      },
      guestId: {
        type: DataTypes.UUID, // Sử dụng UUID để lưu guestId
        allowNull: true, // Cho phép null nếu đây là giỏ hàng của user đã đăng nhập
      },
    }, 
    {
      tableName: 'carts',
      underscored: true,
    }
  );

  return Cart;
};
