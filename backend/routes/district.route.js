const DistrictController = require("../controllers/district.controller")
const router = require("express").Router()

router.get("/", DistrictController.findAll)
router.get("/:id", DistrictController.findOne)

module.exports = router;
