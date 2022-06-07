module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      nameTh: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descTh: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descEn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      inventory: {
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

  Product.associate = (models) => {
    Product.hasMany(models.CartItem, {
      foreignKey: {
        allowNull: false,
        name: "productId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Product.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
        name: "categoryId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Product.belongsTo(models.Subcategory, {
      foreignKey: {
        allowNull: false,
        name: "subcategoryId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: {
        allowNull: false,
        name: "productId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Product;
};
