const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      detailAddress:
      {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
      phoneNumber:
      {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
     districtId:
      {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      cityId:
      {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      wardId:
      {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      otp:
      {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      expireIn:
      {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'users',
      underscored: true,
    }
  );

  return User;
};
