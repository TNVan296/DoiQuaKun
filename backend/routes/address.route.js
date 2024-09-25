const express = require('express');
const router = express.Router();
const { getAllCities, getDistricts,getWards } = require('../controllers/address.controller'); // Import các controller

/**
 * @swagger
 * /api/address/cities:
 *   get:
 *     summary: Lấy danh sách các thành phố
 *     tags:
 *       - Address
 *     responses:
 *       200:
 *         description: Danh sách thành phố
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       400:
 *         description: Lỗi khi lấy danh sách thành phố
 */
router.get('/cities', getAllCities);

/**
 * @swagger
 * /api/address/districts/{cityId}:
 *   get:
 *     summary: Lấy danh sách quận/huyện theo cityId
 *     tags:
 *       - Address
 *     parameters:
 *       - name: cityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thành phố
 *     responses:
 *       200:
 *         description: Danh sách quận/huyện
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       400:
 *         description: Lỗi khi lấy danh sách quận/huyện
 */
router.get('/districts/:cityId', getDistricts);

/**
 * @swagger
 * /api/address/wards/{districtId}:
 *   get:
 *     summary: Lấy danh sách phuong xa theo districtId
 *     tags:
 *       - Address
 *     parameters:
 *       - name: districtId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của huyen
 *     responses:
 *       200:
 *         description: Danh sách phương xa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       400:
 *         description: Lỗi khi lấy danh sách phương xa
 */

router.get('/wards/:districtId', getWards);

module.exports = router;
