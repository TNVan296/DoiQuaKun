const { Op } = require('sequelize');
const db = require('../models/index');

const searchProducts = async (name) => {
  try {
    return await db.products.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });
  } catch (error) {
    console.error('Lỗi khi thực hiện truy vấn tìm kiếm sản phẩm:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    return await db.products.findByPk(id, {
      include: [
        { model: db.pictures, as: 'picture' },
        { model: db.colors, as: 'color' },
        { model: db.sizes, as: 'size' },
        { model: db.productsCategories, as: 'category' }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
    });
  } catch (error) {
    console.error('Lỗi khi truy vấn sản phẩm theo ID:', error);
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    return await db.products.findAll({
      include: [
        { model: db.pictures, as: 'picture' },
        { model: db.colors, as: 'color' },
        { model: db.sizes, as: 'size' },
        { model: db.productsCategories, as: 'category' }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  } catch (error) {
    console.error('Lỗi khi truy vấn tất cả sản phẩm:', error);
    throw error;
  }
};

module.exports = {
  searchProducts,
  getProductById,
  getAllProducts,
};
