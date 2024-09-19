const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Picture = sequelize.define(
    'Picture', 
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
    },
    {
      tableName: 'pictures',
      underscored: true,
    }
  );

  return Picture;
};
