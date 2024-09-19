const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Size = sequelize.define(
    'Size', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sizeName: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      sizeNumber: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    }, 
    {
      tableName: 'sizes',
      underscored: true,
    }
  );

  return Size;
};
