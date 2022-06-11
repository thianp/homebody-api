const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController")

router.get('/', categoryController.getCategory);
router.get('/:subcatId', categoryController.getSubcategory);

module.exports = router;