const express = require('express');
const router = express.Router();

// const CityRoutes = require('./city.route');
// const DistrictRoutes = require('./district.route');
// const FileRoutes = require('./file.route');
const UserRouters = require('./user.route');
// const productRoutes = require('./products.route');
// const cardRoutes = require('./card.route'); // Đường dẫn đến cardRoutes
// const cartRoutes = require('./cart.route');

// router.use('/cities', CityRoutes);
// router.use('/districts', DistrictRoutes);
// router.use('/files', FileRoutes);
router.use('/users', UserRouters);
// router.use('/products', productRoutes);
// router.use('/cards', cardRoutes); 
// router.use('/cart', cartRoutes);


module.exports = router;

