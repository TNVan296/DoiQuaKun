const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Tìm kiếm sản phẩm theo tên
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Tên sản phẩm để tìm kiếm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Sản phẩm A"
 *                   colorId:
 *                     type: integer
 *                     example: 2
 *                   sizeId:
 *                     type: integer
 *                     example: 1
 *                   pictureId:
 *                     type: integer
 *                     example: 5
 *                   categoryId:
 *                     type: integer
 *                     example: 3
 *                   exchangePoint:
 *                     type: integer
 *                     example: 100
 *       400:
 *         description: Tên sản phẩm không được cung cấp hoặc không hợp lệ
 *       404:
 *         description: Không tìm thấy sản phẩm nào
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/search', productController.searchProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Tìm kiếm sản phẩm theo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID sản phẩm muốn tìm kiếm
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm đã tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Sản phẩm A"
 *                   colorId:
 *                     type: integer
 *                     example: 2
 *                   sizeId:
 *                     type: integer
 *                     example: 1
 *                   pictureId:
 *                     type: integer
 *                     example: 5
 *                   categoryId:
 *                     type: integer
 *                     example: 3
 *                   exchangePoint:
 *                     type: integer
 *                     example: 100
 *       400:
 *         description: ID sản phẩm không cung cấp hoặc không hợp lệ
 *       404:
 *         description: Không tìm thấy sản phẩm nào
 *       500:
 *         description: Lỗi máy chủ
 * */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lấy tất cả sản phẩm
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm đã được lấy được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string 
 *                     example: "Sản phẩm A"
 *                   colorId:
 *                     type: integer
 *                     example: 2
 *                   sizeId:
 *                     type: integer
 *                     example: 1
 *                   pictureId:
 *                     type: integer
 *                     example: 5
 *                   categoryId:
 *                     type: integer
 *                     example: 3
 *                   exchangePoint:
 *                     type: integer
 *                     example: 100
 *       500:
 *         description: Lỗi máy chủ
 * */

router.get('/', productController.getAllProducts);

router.get('/category/:id', productController.getProductsByCategoryId);

module.exports = router;
