module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
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

  Province.associate = (models) => {
    Province.hasMany(models.User, {
      foreignKey: {
        allowNull: false,
        name: "provinceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Province.hasMany(models.Amphure, {
      foreignKey: {
        allowNull: false,
        name: "provinceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Province.belongsTo(models.Geography, {
      foreignKey: {
        allowNull: false,
        name: "geographyId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Province;
};
