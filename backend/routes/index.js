const express = require('express');
const router = express.Router();
const userRouters = require('./user.route');
const productRoutes = require('./products.route');
const cardRoutes = require('./card.route'); 
const cartRoutes = require('./cart.route');
const orderRoutes = require('./order.route');
const fileRoutes = require('./file.route');
const addressRoutes = require('./address.route');

router.use('/users', userRouters);
router.use('/products', productRoutes);
router.use('/cards', cardRoutes); 
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/files', fileRoutes);
router.use('/address', addressRoutes);

module.exports = router;

