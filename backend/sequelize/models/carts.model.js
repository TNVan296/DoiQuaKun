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
      totalItems: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalPoints: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
      },
    
    }, 
    {
      tableName: 'carts',
      underscored: true,
    }
  );

  return Cart;
};
