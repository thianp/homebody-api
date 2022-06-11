const createError = require("../utils/createError");
const { CartItem, User, Product } = require("../models");

exports.addCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    let cartItem = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId,
      },
    });
    
    if (!cartItem) {
      cartItem = await CartItem.create({
        productId,
        quantity,
        userId: req.user.id,
      });
    } else if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
    }
    res.json({ cartItem });
  } catch (err) {
    next(err);
  }
};

exports.getCartItems = async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Product,
        },
      ],
    });

    res.json({ cartItems });
  } catch (err) {
    next(err);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findOne({ where: { id } });
    if (!cartItem) {
      createError("item not found in cart", 400);
    }

    await CartItem.destroy({ where: { id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
