const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models");
const validator = require("validator");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isEmail = validator.isEmail(email + "");
    if (!isEmail) {
      createError("email is invalid", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    const token = genToken({ id: admin.id, isAdmin: true });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!admin) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: admin.id, isAdmin: true });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
