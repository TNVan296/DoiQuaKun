const express = require('express');
const router = express.Router();

const CityRoutes = require('./city.route');
const DistrictRoutes = require('./district.route');
const FileRoutes = require('./file.route');

router.use('/cities', CityRoutes);
router.use('/districts', DistrictRoutes);
router.use('/files', FileRoutes);

// Import các router khác
const productRoutes = require('./products.route');
const cardRoutes = require('./card.route'); // Đường dẫn đến cardRoutes
const cartRoutes = require('./cart.route');

// Sử dụng các router
router.use('/products', productRoutes);
router.use('/cards', cardRoutes); 
router.use('/cart', cartRoutes);

module.exports = router;

