const { DataTypes } = require('sequelize');
const { products } = require('../database');

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
      points:
      {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userId:
      {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      shipAddress:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
     
     
    }, 
    {
      tableName: 'carts',
      underscored: true,
    }
  );

  return Cart;
};
