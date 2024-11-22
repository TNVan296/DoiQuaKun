const { searchProduct, getAllProductItems, getProductByID, getProductByCategory } = require('../services/products.services');

const searchProducts = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: 'Tên sản phẩm không được cung cấp' });
    }
    const product = await searchProduct(name);
    if (!product.success) {
      return res.status(404).json({ message: product.message });
    } else {
      return res.status(200).send({ message: product.message, data: product.data });
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productById = await getProductByID(id);
    if (!productById.success) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm nào' });
    } else {
      return res.status(200).send({ message: productById.message, data: productById.data });
    }
  } catch (error) {
    console.error('Lỗi khi truy vấn sản phẩm theo ID:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductItems();
    if (!products.success) {
      return res.status(404).json({ message: products.message });
    } else {
      return res.status(200).send({ message: products.message, data: products.data });
    }
  } catch (error) {
    console.error('Lỗi khi lấy tất cả sản phẩm: ', error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// const getProductsByCategory = async (req, res) => {
//   try {
//     const productByCategory = await getProductByCategory();
//     if (!productByCategory.success) {
//       return res.status(404).json({ message: productByCategory.message });
//     } else {
//       return res.status(200).send({ message: productByCategory.message, data: productByCategory.data });
//     }
//   } catch (error) {
//     console.error('Lỗi khi truy vấn sản phẩm theo ID: ', error);
//     return res.status(500).json({ error: 'Lỗi máy chủ' });
//   }
// };

module.exports = {
  searchProducts,
  getProductById,
  getAllProducts,
  // getProductsByCategory
};
