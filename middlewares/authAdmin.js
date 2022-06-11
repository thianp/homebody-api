const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      createError("you are unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      createError("you are unauthorized", 401);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const isAdmin = payload.isAdmin;

    if (!isAdmin) {
      createError("you are not an admin", 401);
    }

    const admin = await Admin.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!admin) {
      createError("you are unauthorized", 401);
    }

    req.admin = admin;

    next();
  } catch (err) {
    next(err);
  }
};
