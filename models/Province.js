module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
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

  Province.associate = (models) => {
    Province.hasMany(models.User, {
      foreignKey: {
        allowNull: false,
        name: "provinceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Province.hasMany(models.Amphoe, {
      foreignKey: {
        allowNull: false,
        name: "provinceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Province.hasMany(models.District, {
      foreignKey: {
        allowNull: false,
        name: "provinceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Province;
};
