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
      // 
      cityAdress:
      {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
      provinceAdress:
      {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
      districtAdress:
      {
        allowNull: true,
        type: DataTypes.STRING(255)
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
