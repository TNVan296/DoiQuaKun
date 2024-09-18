const express = require('express');
const router = express.Router();

// Import các router khác
const productRoutes = require('./products.route');

// Sử dụng các router
router.use('/products', productRoutes); 


module.exports = router;
