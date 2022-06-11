const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController")

router.get('/provinces', addressController.getProvinces);
router.get('/districts/:amphoeId', addressController.getDistricts);
router.get('/amphoes/:provinceId', addressController.getAmphoes);

module.exports = router;