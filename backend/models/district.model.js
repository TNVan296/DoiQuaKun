const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const District = sequelize.define("District", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: false
  });
  return District;
};