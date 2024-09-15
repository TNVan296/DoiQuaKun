const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Color = sequelize.define(
    'Color', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
    },
    {
      tableName: 'colors',
      underscored: true,
    }
  );

  return Color;
};
