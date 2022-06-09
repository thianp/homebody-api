const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authUser = require("../middlewares/authUser");
const authAdmin = require("../middlewares/authAdmin");

router.post("/", authUser, orderController.submitOrder);
router.get("/", authUser, orderController.getUserOrders);
router.get("/all", authAdmin, orderController.getAllOrders);

module.exports = router;
