const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Card = sequelize.define(
    'Card', 
    {
      // 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      point:
      {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      status:
      {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      validFrom:
      {
        allowNull: false,
        type: DataTypes.DATE
      },
      validTo:
      {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, 
    {
      tableName: 'cards',
      underscored: true,
    }
  );

  return Card;
};
