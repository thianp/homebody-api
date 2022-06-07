module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
      "Order",
      {
        total: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        date: DataTypes.DATEONLY,
      },
      {
        underscored: true,
      }
    );

    Order.associate = models => {
      Order.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Order.hasMany(models.OrderItem, {
        foreignKey: {
          allowNull: false,
          name: "orderId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Order.hasOne(models.Payment, {
        foreignKey: {
          allowNull: false,
          name: "orderId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  
    return Order;
  };
  