const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define(
    'Product', 
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
      colorId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      sizeId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      pictureId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      categoryId: { 
        allowNull: false,
        type: DataTypes.INTEGER
      },
      designId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      exchangePoint: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    }, 
    {
      tableName: 'products',
      underscored: true,
    }
  );

  return Product;
};
