const cartService = require('../services/cart.services');
const { cartAddResponseTemplate, cartRemoveResponseTemplate } = require('../utils/responses/cart.response');
const handleError = require('../utils/errorHandler');

const handleAddCartItem = async (req, res) => {
  const { productId, quantity, userId } = req.body; // Middleware and token not yet implemented

  if (!productId || !userId) {
    return res.status(400).json({ message: 'productId and userId are required' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than zero' });
  }

  try {
    const cartItem = await cartService.addCartItem(productId, userId, quantity);
    
    return res.status(200).json(cartAddResponseTemplate(cartItem)); 
  } catch (error) {
    handleError(res, error, 'Could not add item to cart');
  }
};

const handleRemoveCartItem = async (req, res) => {
  const { productId, quantity, userId } = req.body; // Middleware and token not yet implemented

  if (!productId || !userId) {
    return res.status(400).json({ message: 'productId and userId are required' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than zero' });
  }

  try {
    const cartItem = await cartService.removeCartItem(productId, userId, quantity);
    return res.status(200).json(cartRemoveResponseTemplate(cartItem));
  } catch (error) {
    handleError(res, error, 'Could not remove item from cart');
  }
};

module.exports = {
  handleAddCartItem,
  handleRemoveCartItem,
};
