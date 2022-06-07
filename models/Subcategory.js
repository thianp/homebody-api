module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define(
      "Subcategory",
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

    Subcategory.associate = (models) => {
      Subcategory.hasMany(models.Product, {
        foreignKey: {
          allowNull: false,
          name: "subcategoryId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Subcategory.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false,
          name: "categoryId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
    return Subcategory;
  };
  