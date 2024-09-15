const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Delivery = sequelize.define(
    'Delivery', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      cartId:
      {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deliveriesAddress:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      status:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      }
    }, 
    {
      tableName: 'Deliveries',
      underscored: true,
    }
    // 
  );

  return Delivery;
};
