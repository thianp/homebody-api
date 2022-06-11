const { Province, District, Amphure } = require("../models");

exports.getProvinces = async (req, res, next) => {
  try {
    let provinces = await Province.findAll();
    res.json({ provinces });
  } catch (err) {
    next(err);
  }
};

exports.getDistricts = async (req, res, next) => {
  try {
    let districts = await District.findAll({
      where: { amphureId: req.params.amphoeId },
    });
    res.json({ districts });
  } catch (err) {
    next(err);
  }
};

exports.getAmphoes = async (req, res, next) => {
  try {
    let amphoes = await Amphure.findAll({
      where: { provinceId: req.params.provinceId },
    });
    res.json({ amphoes });
  } catch (err) {
    next(err);
  }
};
