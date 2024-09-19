const { DataTypes } = require('sequelize');
const { carts } = require('./carts.model')

module.exports = (sequelize) => {
  const CartItem = sequelize.define(
    'CartItem', 
    {
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
