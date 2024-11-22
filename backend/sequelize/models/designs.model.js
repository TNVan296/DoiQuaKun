const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Design = sequelize.define(
    'Design',
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
      }
    }, 
    {
      tableName: 'designs',
      underscored: true,
    }
  );

  return Design;
};
