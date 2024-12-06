const { use } = require('../routes');
const orderService = require('../services/order.service');

const getOrder = async (req, res) => {
  try {
    const userObject = {
      user: req.user,
    }
    console.log(userObject)
    const order = await orderService.getCompletedOrders(userObject);
    if (!order.success) {
      return res.status(400).json({ message: order.message });
    } else {
      return res.status(200).send({ message: order.message, data: order.data });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong !' });
  }
};

const getOrderProductsById = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const order = await orderService.getCompletedProductOrders(cartId);
    if (!order.success) {
      return res.status(400).json({ message: order.message });
    } else {
      return res.status(200).send({ message: order.message, data: order.data });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong !' });
  }
};

module.exports = {
  getOrder,
  getOrderProductsById
};
