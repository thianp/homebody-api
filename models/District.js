module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    "District",
    {
      zipCode: {
        type: DataTypes.INTEGER,
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

  District.associate = (models) => {
    District.hasMany(models.User, {
      foreignKey: {
        allowNull: false,
        name: "districtId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    District.belongsTo(models.Amphure, {
      foreignKey: {
        allowNull: false,
        name: "amphureId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

  };

  return District;
};
