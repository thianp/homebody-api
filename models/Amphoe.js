module.exports = (sequelize, DataTypes) => {
    const Amphoe = sequelize.define(
      "Amphoe",
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

    Amphoe.associate = (models) => {
      Amphoe.hasMany(models.User, {
        foreignKey: {
          allowNull: false,
          name: "amphoeId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Amphoe.belongsTo(models.District, {
        foreignKey: {
          allowNull: false,
          name: "districtId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Amphoe.belongsTo(models.Province, {
        foreignKey: {
          allowNull: false,
          name: "provinceId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
    return Amphoe;
  };
  