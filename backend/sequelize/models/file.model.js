const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

  const File = sequelize.define("File", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: false
  });
  return File;
};