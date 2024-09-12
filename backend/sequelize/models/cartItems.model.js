const { DataTypes } = require('sequelize');
const { carts } = require('../database');

module.exports = (sequelize) => {
  const CartItem = sequelize.define(
    'CartItem', 
    { 
      // Thưởng sửa
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: DataTypes.INTEGER
      // },
      cartId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      tableName: 'cart-items',
      underscored: true,
    }
  );

  return CartItem;
};
