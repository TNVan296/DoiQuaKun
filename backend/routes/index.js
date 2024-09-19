const express = require('express');
const router = express.Router();

const CityRoutes = require('./city.route');
const DistrictRoutes = require('./district.route');
const FileRoutes = require('./file.route');

const productRoutes = require('./products.route');
const cardRoutes = require('./card.route'); 
const cartRoutes = require('./cart.route');

router.use('/cities', CityRoutes);
router.use('/districts', DistrictRoutes);
router.use('/files', FileRoutes);

router.use('/products', productRoutes);
router.use('/cards', cardRoutes); 
router.use('/cart', cartRoutes);

module.exports = router;

