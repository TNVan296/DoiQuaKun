const express = require('express');
const router = express.Router();

const CityRoutes = require('./city.route');
const DistrictRoutes = require('./district.route');
const FileRoutes = require('./file.route');

router.use('/cities', CityRoutes);
router.use('/districts', DistrictRoutes);
router.use('/files', FileRoutes);

module.exports = router;