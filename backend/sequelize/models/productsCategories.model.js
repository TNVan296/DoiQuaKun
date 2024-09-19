const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductCategory = sequelize.define(
    'ProductCategory', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      // 
      name: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
    }, 
    {
      tableName: 'product_categories',
      underscored: true,
    }
  );

  return ProductCategory;
};
