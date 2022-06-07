module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define(
      "CartItem",
      {
        quantity: {
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

    CartItem.associate = models => {
      CartItem.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })

      CartItem.belongsTo(models.Product, {
        foreignKey: {
          allowNull: false,
          name: "productId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  
    return CartItem;
  };
  