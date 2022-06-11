const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const validator = require("validator");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const {
      fName,
      lName,
      phoneNumber,
      email,
      password,
      addressLine1,
      amphureId,
      districtId,
      provinceId,
      postalCode,
    } = req.body;

    const isPhoneNumber = validator.isMobilePhone(phoneNumber + "");
    if (!isPhoneNumber) {
      createError("phone number is invalid", 400);
    }

    const isEmail = validator.isEmail(email + "");
    if (!isEmail) {
      createError("email is invalid", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      fName,
      lName,
      phoneNumber,
      email,
      password: hashedPassword,
      addressLine1,
      amphureId,
      districtId,
      provinceId,
      postalCode,
    });

    const token = genToken({ id: user.id, isAdmin: false });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: user.id, isAdmin: false });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
