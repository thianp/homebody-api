module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "Category",
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
      },
      {
        underscored: true,
      }
    );

    Category.associate = (models) => {
      Category.hasMany(models.Product, {
        foreignKey: {
          allowNull: false,
          name: "categoryId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Category.hasMany(models.Subcategory, {
        foreignKey: {
          allowNull: false,
          name: "categoryId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
    return Category;
  };
  