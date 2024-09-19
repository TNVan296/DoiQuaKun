const CityController = require("../controllers/city.controller");
const router = require("express").Router();

/**
 * @swagger
 * /mltech/cities:
 *   get:
 *     summary: Get all cities
 *     description: Get all cities
 *     responses:
 *       200:
 *         description: Get all cities
 *       400:
 *         description: Invalid request
 */

router.get("/", CityController.findAll);

/**
 * @swagger
 * /mltech/cities/{id}:
 *   get:
 *     summary: Get a city
 *     description: Get a city
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the city
 *     responses:
 *       200:
 *         description: Get a city
 *       400:
 *         description: Invalid request
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", CityController.findOne);

module.exports = router;
