const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CartItem = sequelize.define(
    'CartItem', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      cartId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    }, 
    {
      tableName: 'cart_items',
      underscored: true,
    }
  );

  return CartItem;
};
