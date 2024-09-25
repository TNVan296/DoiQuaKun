const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ward = sequelize.define('Ward', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'districts', // Tên bảng districts
        key: 'id',
      },
    },
  }, {
    tableName: 'wards', // Tên bảng trong cơ sở dữ liệu
    underscored: true,
    timestamps: false,
  });

  return Ward;
};
