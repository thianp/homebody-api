const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const { Payment } = require("../models");

exports.makePayment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    if (!req.file) {
      createError("payment slip is required", 400);
    }
    let image;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }

    const payment = await Payment.create({
      orderId,
      paymentSlip: image,
      status: "PENDING",
      userId: req.user.id,
    });
    res.json({ payment });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.editPaymentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updateValue = { status };

    await Payment.update(updateValue, { where: { id: req.params.id } });
    res.json(updateValue);
  } catch (err) {
    next(err);
  }
};
