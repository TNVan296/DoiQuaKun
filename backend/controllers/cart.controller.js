const cartService = require('../services/cart.services');
const {
  cartAddResponseTemplate,
  cartRemoveResponseTemplate,
  cartCheckoutResponseTemplate,
  cartCheckoutErrorResponseTemplate,
} = require('../utils/responses/cart.response');
const handleError = require('../utils/errorHandler');


const getCart = async (req, res) => {
  try {
    const userObject = {
      user: req.user,
    }
    const cart = await cartService.getCartItems(userObject);
    if (!cart) {
      return res.status(400).json({ message: cart.message });
    }
    return res.status(200).send({ message: cart.message, data: cart.data });
  } catch (error) {
    handleError(res, error, 'Could not get cart');
  }
};

const getCartPoints = async (req, res) => {
  try {
    const userObject = {
      user: req.user,
    }
    const exchangePoint = await cartService.getExchangePoints(userObject);
    const userPoints = await cartService.getUserPoints(userObject);
    if (!exchangePoint || !userPoints) {
      return res.status(400).json({ message: cart.message });
    }
    return res.status(200).json({ exchangePoint: exchangePoint.data, userPoints: userPoints.data });
  } catch (error) {
    handleError(res, error, 'Could not get cart');
  }
};

// Handle adding an item to the cart
const handleAddCartItem = async (req, res) => {
  const cartObject = {
    cart: req.body,
  }
  try {
    const cartItem = await cartService.addCartItem(cartObject);
    return res.status(200).json(cartAddResponseTemplate(cartItem));
  } catch (error) {
    handleError(res, error, 'Could not add item to cart');
  }
};

// Handle removing an item from the cart
const handleRemoveCartItem = async (req, res) => {
  const cartObject = {
    cart: req.body,
  }
  try {
    const cartItem = await cartService.removeCartItem(cartObject);
    return res.status(200).json(cartRemoveResponseTemplate(cartItem));
  } catch (error) {
    handleError(res, error, 'Could not remove item from cart');
  }
};

// Handle checkout
const handleCheckout = async (req, res) => {
  const cartObject = {
    cart: req.body,
  }
  try {
    const result = await cartService.checkoutCart(cartObject);
    return res.status(200).json(cartCheckoutResponseTemplate(result.cart, result.totalPointsPaid));
  } catch (error) {
    return res.status(400).json(cartCheckoutErrorResponseTemplate(error.message));
  }
};

module.exports = {
  getCart,
  getCartPoints,
  handleAddCartItem,
  handleRemoveCartItem,
  handleCheckout,
};
