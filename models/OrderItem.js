module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
      "OrderItem",
      {
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
      },
      {
        underscored: true,
      }
    );

    OrderItem.associate = models => {
      OrderItem.belongsTo(models.Order, {
        foreignKey: {
          allowNull: false,
          name: "orderId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })

      OrderItem.belongsTo(models.Product, {
        foreignKey: {
          allowNull: false,
          name: "productId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  
    return OrderItem;
  };
  