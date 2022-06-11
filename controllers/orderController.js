const {
  CartItem,
  User,
  Product,
  Order,
  OrderItem,
  sequelize,
} = require("../models");
const createError = require("../middlewares/error");

exports.submitOrder = async (req, res, next) => {
  try {
    const result = await sequelize.transaction(async (t) => {
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

      const total = cartItems.reduce((prevVal, curObj) => {
        return prevVal + curObj.quantity * curObj.Product.price;
      }, 0);

      const order = await Order.create({ userId: req.user.id, total });

      cartItems.map(async (item) => {
        // const { inventory } = await Product.findOne({
        //   where: {
        //     id: item.productId,
        //   },
        // });

        // if (inventory >= item.quantity) {
          await OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.Product.price,
          });
          await CartItem.destroy({ where: { id: item.id } });
      //   } else {
      //     createError("not enough inventory", 502);
      //   }
      });

      res.status(201).json({ order });
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: OrderItem,
        },
      ],
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};
