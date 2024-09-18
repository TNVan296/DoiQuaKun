const productService = require('../services/products.services');

const searchProducts = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: 'Tên sản phẩm không được cung cấp' });
    }

    const products = await productService.searchProducts(name);
    if (products.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm nào' });
    }

    return res.json(products);
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};


const getProductById = async (req, res) => {
    try {
      const id = req.params.id;

      const product = await productService.getProductById(id);

      if (!product) {
        return res.status(404).json({ error: 'Không tìm thấy san pham nào' });
      }

      return res.json(product);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm san pham:', error);
      return res.status(500).json({ error: 'Lỗi máy chủ' });
    }
    
  };
  

  

module.exports = 
{
  searchProducts,
  getProductById,
};
