module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    "District",
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

  District.associate = (models) => {
    District.hasMany(models.User, {
      foreignKey: {
        allowNull: false,
        name: "districtId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    District.hasMany(models.Amphoe, {
      foreignKey: {
        allowNull: false,
        name: "districtId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    District.belongsTo(models.Province, {
      foreignKey: {
        allowNull: false,
        name: "provinceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return District;
};
