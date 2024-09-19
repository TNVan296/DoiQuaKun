const { DataTypes } = require('sequelize');
const { products } = require('./products.model')

module.exports = (sequelize) => {
  const Cart = sequelize.define(
    'Cart', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      status:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      total_items: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userId:
      {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    }, 
    {
      tableName: 'carts',
      underscored: true,
    }
  );

  return Cart;
};
