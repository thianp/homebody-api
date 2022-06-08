const createError = require("../utils/createError");
const { User } = require("../models");

exports.getMe = async (req, res, next) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const {
      fName,
      lName,
      phoneNumber,
      currentPassword,
      newPassword,
      addressLine1,
      amphoeId,
      districtId,
      provinceId,
      postalCode,
    } = req.body;

    if (!currentPassword) {
      createError("current password is required", 400);
    }

    const updateValue = {
      fName,
      lName,
      phoneNumber,
      password: newPassword,
      addressLine1,
      amphoeId,
      districtId,
      provinceId,
      postalCode,
    };

    await User.update(updateValue, { where: { id: req.user.id } });
    res.json(updateValue);
  } catch (err) {
    next(err);
  }
};
