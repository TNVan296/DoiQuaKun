const DistrictController = require("../controllers/district.controller")
const router = require("express").Router()

/**
 * @swagger
 * /mltech/districts:
 *   get:
 *     summary: Get all districts
 *     description: Get all districts
 *     responses:
 *       200:
 *         description: Get all districts
 *       400:
 *         description: Invalid request
 */

router.get("/", DistrictController.findAll)

/**
 * @swagger
 * /mltech/districts/{id}:
 *   get:
 *     summary: Get a district
 *     description: Get a district
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the district
 *     responses:
 *       200:
 *         description: Get a district
 *       400:
 *         description: Invalid request
 *       404:
 *         description: District not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", DistrictController.findOne)

module.exports = router;
