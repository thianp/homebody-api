const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController")
const authAdmin = require("../middlewares/authAdmin")

router.post('/', authAdmin, productController.createProduct);
router.patch('/:id', authAdmin, productController.editProduct);
router.get('/:subcatId?', productController.getProducts);

module.exports = router;