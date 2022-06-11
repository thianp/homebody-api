const { Product } = require("../models");

exports.createProduct = async (req, res, next) => {
  try {
    const {
      nameTh,
      nameEn,
      descTh,
      descEn,
      categoryId,
      subcategoryId,
      inventory,
      price,
    } = req.body;

    let product = await Product.create({
      nameTh,
      nameEn,
      descTh,
      descEn,
      categoryId,
      subcategoryId,
      inventory,
      price,
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const {
      nameTh,
      nameEn,
      descTh,
      descEn,
      categoryId,
      subcategoryId,
      inventory,
      price,
    } = req.body;

    const updateValue = {
      nameTh,
      nameEn,
      descTh,
      descEn,
      categoryId,
      subcategoryId,
      inventory,
      price,
    };

    await Product.update(updateValue, { where: { id: req.params.id } });
    res.json(updateValue);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    let products;
    if (req.params.subcatId) {
      products = await Product.findAll({
        where: { subcategoryId: req.params.subcatId },
      });
    } else if (!req.params.subcatId) {
      products = await Product.findAll();
    }
    res.json({ products });
  } catch (err) {
    next(err);
  }
};
