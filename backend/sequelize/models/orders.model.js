const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    orderAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    babyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    babyAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    babyGender: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    detailAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'orders',
    underscored: true,
    timestamps: false,
  });

  return Order;
};
