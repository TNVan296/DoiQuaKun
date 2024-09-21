const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');


 
router.post('/add', cartController.handleAddCartItem);
router.post('/remove',cartController.handleRemoveCartItem);

module.exports = router;
