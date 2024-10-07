const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("City", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'cities',
    underscored: true,
    timestamps: false
  }
);

  return City;
};
