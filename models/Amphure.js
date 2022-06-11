module.exports = (sequelize, DataTypes) => {
    const Amphure = sequelize.define(
      "Amphure",
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

    Amphure.associate = (models) => {
      Amphure.hasMany(models.User, {
        foreignKey: {
          allowNull: false,
          name: "amphureId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Amphure.hasMany(models.District, {
        foreignKey: {
          allowNull: false,
          name: "amphureId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Amphure.belongsTo(models.Province, {
        foreignKey: {
          allowNull: false,
          name: "provinceId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
    return Amphure;
  };
  