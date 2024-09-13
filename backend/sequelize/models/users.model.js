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
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      detailAddress:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      phoneNumber:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      // 
      cityAdress:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      provinceAdress:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      districtAdress:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      }
    },
    {
      tableName: 'users',
      underscored: true,
    }
  );

  return User;
};
