const express = require('express');
const router = express.Router();

const CityRoutes = require('./city.route');
const DistrictRoutes = require('./district.route');
const FileRoutes = require('./file.route');
const UserRoutes = require('./user.route');

router.use('/cities', CityRoutes);
router.use('/districts', DistrictRoutes);
router.use('/files', FileRoutes);
router.use('/users', UserRoutes);

module.exports = router;