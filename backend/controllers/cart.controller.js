const cartService = require('../services/cart.services');
const cartResponseTemplate = require('../utils/responses/cart.response');
const handleError = require('../utils/errorHandler');

const handleAddCartItem = async (req, res) => {
  const { productId, quantity, userId } = req.body;//tam thoi chua su dung middware và tokken

  if (!productId || !userId) {
    return res.status(400).json({ message: 'productId and userId are required' });
  }

  try {
    const cartItem = await cartService.addCartItem(productId, userId, quantity);
    
    return res.status(200).json(cartResponseTemplate(cartItem)); 
  } catch (error) {
    handleError(res, error, 'Could not add item to cart');
  }
};

module.exports = {
  handleAddCartItem,
};
