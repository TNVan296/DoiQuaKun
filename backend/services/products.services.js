const { Op } = require('sequelize');
const db = require('../sequelize/database.js');

const searchProducts = async (name) => {
  try {
    return await db.Product.findAll({
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
    return await db.Product.findByPk(id, {
      include: [
        { model: db.Picture, as: 'picture' },
        { model: db.Color, as: 'color' },
        { model: db.Size, as: 'size' },
        { model: db.ProductCategory, as: 'category' }
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
    return await db.Product.findAll({
      include: [
        { model: db.Picture, as: 'picture' },
        { model: db.Color, as: 'color' },
        { model: db.Size, as: 'size' },
        { model: db.ProductCategory, as: 'category' }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  } catch (error) {
    console.error('Lỗi khi truy vấn tất cả sản phẩm:', error);
    throw error;
  }
};

const getProductsByCategory = async (categoryId) => {
  try {
    return await db.Product.findAll({
      include: [
        { model: db.Picture, as: 'picture' },
        { model: db.Color, as: 'color' },
        { model: db.Size, as: 'size' },
        { model: db.ProductCategory, as: 'category' }
      ],
      where: { categoryId },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  } catch (error) {
    console.error('Lỗi khi truy vấn tất cả san pham theo chúng tình:', error);
    throw error;
  }
};

module.exports = {
  searchProducts,
  getProductById,
  getAllProducts,
  getProductsByCategory
};
