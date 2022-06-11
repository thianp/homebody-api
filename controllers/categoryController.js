const { Category, Subcategory } = require("../models");

exports.getCategory = async (req, res, next) => {
  try {
    let categories = await Category.findAll();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.getSubcategory = async (req, res, next) => {
  try {
    let subcategories = await Subcategory.findAll({
      where: { categoryId: req.params.subcatId },
    });
    res.json({ subcategories });
  } catch (err) {
    next(err);
  }
};
