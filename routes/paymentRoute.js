const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload');

const paymentController = require("../controllers/paymentController")
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

router.post('/', authUser, upload.single('image'), paymentController.makePayment);
router.patch('/:id', authAdmin, paymentController.editPaymentStatus);

module.exports = router;