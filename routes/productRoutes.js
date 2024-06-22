const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateObjectId = require('../utils/validateObjectId');

router.get('/', productController.getAllProducts);
router.get('/:id', validateObjectId, productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', validateObjectId, productController.updateProduct);
router.delete('/:id', validateObjectId, productController.deleteProduct);

module.exports = router;
