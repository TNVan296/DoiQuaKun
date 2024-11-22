const { Op } = require('sequelize');
const db = require('../sequelize/database.js');

const searchProduct = async (name) => {
  try {
    const product = await db.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });
    if (!product) {
      return { success: false, message: 'Không tìm thấy sản phẩm nào có tên như vậy !' }
    } else {
      return { success: true, data: product, message: 'Tìm thấy sản phẩm thành công !' };
    }
  } catch (error) {
    console.error('Lỗi khi thực hiện truy vấn tìm kiếm sản phẩm:', error);
    throw error;
  }
};

// Lấy sản phẩm theo ID và gom nhóm
const getProductByID = async (id) => {
  try {
    const productById = await db.ProductCategory.findByPk(id, {
      include: [
        { 
          model: db.Product, 
          as: 'products', 
          include: [
            { model: db.Picture, as: 'picture' },
            { model: db.Color, as: 'color' },
            { model: db.Size, as: 'size' },
            { model: db.Design, as: 'design' }
          ]
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
    });

    if (!productById) {
      return { success: false, message: 'Không tìm thấy sản phẩm nào có ID như vậy !' };
    } else {
      return { success: true, message: 'Lấy sản phẩm thành công !', data: productById };
    }
  } catch (error) {
    console.error('Lỗi khi truy vấn sản phẩm theo ID:', error);
    throw error;
  }
};

const getAllProductItems = async () => {
  try {
    const products = await db.ProductCategory.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!products) {
      return { success: false, message: 'Không tìm thấy sản phẩm !' }
    } else {
      return { success: true, data: products, message: 'Lấy sản phẩm thành công !' };
    }
  } catch (error) {
    console.error('Lỗi khi truy vấn tất cả sản phẩm:', error);
    throw error;
  }
};

// const getProductCategories = async () => {
//   try {
//     const productByCategory = await db.Product.findOne({
//       include: [
//         { model: db.Picture, as: 'picture' },
//         { model: db.Color, as: 'color' },
//         { model: db.Size, as: 'size' },
//         { model: db.Design, as: 'design' }
//       ],
//       attributes: { exclude: ['createdAt', 'updatedAt'] }
//     });
//     if (!productByCategory) {
//       return { success: false, message: 'Không tìm thấy sản phẩm !' }
//     } else {
//       return { success: true, data: productByCategory, message: 'Lấy sản phẩm thành công !' };
//     }
//   } catch (error) {
//     console.error('Lỗi khi truy vấn tất cả san pham theo chuyên mục:', error);
//     throw error;
//   }
// };

module.exports = {
  searchProduct,
  getProductByID,
  getAllProductItems,
  // getProductCategories
};
