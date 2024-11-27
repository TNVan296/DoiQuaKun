const cartService = require('../services/cart.services');
const handleError = require('../utils/errorHandler');


const getCart = async (req, res) => {
  try {
    const userObject = {
      user: req.user,
    }
    const cart = await cartService.getCartItems(userObject);
    if (!cart.success) {
      return res.status(400).json({ message: cart.message });
    } else {
      return res.status(200).send({ message: cart.message, data: cart.data });
    }
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
    if (!exchangePoint.success || !userPoints.success) {
      return res.status(400).json({ message: cart.message });
    } else {
      return res.status(200).json({ exchangePoint: exchangePoint.data, userPoints: userPoints.data });
    }
  } catch (error) {
    handleError(res, error, 'Could not get cart');
  }
};

// Handle adding an item to the cart
const handleAddCartItem = async (req, res) => {
  const cartObject = {
    cart: req.body,
  }
  console.log(cartObject)
  try {
    const cartItem = await cartService.addCartItem(cartObject);
    if (!cartItem.success) {
      return res.status(400).json({ message: cartItem.message });
    } else {
      return res.status(200).json({ message: cartItem.message, data: cartItem.data });
    }
  } catch (error) {
    console.log('Could not add item to cart', error);
  }
};

// Handle removing an item from the cart
const handleRemoveCartItem = async (req, res) => {
  const cartObject = {
    cart: req.body,
  }
  try {
    const cartItem = await cartService.removeCartItem(cartObject);
    if (!cartItem.success) {
      return res.status(400).json({ message: cartItem.message });
    } else {
      return res.status(200).json({ message: cartItem.message, data: cartItem.data });
    }
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
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    } else {
      return res.status(200).json({ message: result.message, data: result.data, totalPointsPaid: result.totalPointsPaid });
    }
  } catch (error) {
    handleError(res, error, 'Could not checkout cart');
  }
};

module.exports = {
  getCart,
  getCartPoints,
  handleAddCartItem,
  handleRemoveCartItem,
  handleCheckout,
};
