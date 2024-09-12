const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Wallet = sequelize.define(
    'Wallet', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      cardId:
      {
        allowNull: false,
        type: DataTypes.INTEGER
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
      // Thưởng thêm
      status:
      {
        allowNull: false,
        type: DataTypes.STRING(10)
      }
    }, 
    {
      tableName: 'wallets',
      underscored: true,
    }
  );

  return Wallet;
};
