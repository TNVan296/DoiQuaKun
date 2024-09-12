const express = require('express');
const router = express.Router();
const MLTeachController = require('../controller/MLTeach.controller');

router.get('/', MLTeachController.getHello);

module.exports = router;
