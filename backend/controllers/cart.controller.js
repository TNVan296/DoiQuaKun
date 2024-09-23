const cartService = require('../services/cart.services');
const {
  cartAddResponseTemplate,
  cartRemoveResponseTemplate,
  cartCheckoutResponseTemplate,
  cartCheckoutErrorResponseTemplate,
} = require('../utils/responses/cart.response');
const handleError = require('../utils/errorHandler');

// Handle adding an item to the cart
const handleAddCartItem = async (req, res) => {
  const { productId, quantity, userId } = req.body;

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

// Handle removing an item from the cart
const handleRemoveCartItem = async (req, res) => {
  const { productId, quantity, userId } = req.body;

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

// Handle checkout
const handleCheckout = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const result = await cartService.checkoutCart(userId);
    return res.status(200).json(cartCheckoutResponseTemplate(result.cart, result.totalPointsPaid));
  } catch (error) {
    return res.status(400).json(cartCheckoutErrorResponseTemplate(error.message));
  }
};

module.exports = {
  handleAddCartItem,
  handleRemoveCartItem,
  handleCheckout,
};
