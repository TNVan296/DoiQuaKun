const CityController = require("../controllers/city.controller");
const router = require("express").Router();

router.get("/", CityController.findAll);
router.get("/:id", CityController.findOne);

module.exports = router;
