const express = require('express');
const router = express.Router();
const UserRouters = require('./user.route');
const productRoutes = require('./products.route');
const cardRoutes = require('./card.route'); 
const cartRoutes = require('./cart.route');
const fileRoutes = require('./file.route');
const address = require('./address.route');

router.use('/users', UserRouters);
router.use('/products', productRoutes);
router.use('/cards', cardRoutes); 
router.use('/cart', cartRoutes);
router.use('/files', fileRoutes);
router.use('/address',address);

module.exports = router;

