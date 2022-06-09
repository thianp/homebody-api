module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      postalCode: {
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

  User.associate = (models) => {
    User.belongsTo(models.Amphure, {
      foreignKey: {
        allowNull: false,
        name: "amphureId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.belongsTo(models.District, {
      foreignKey: {
        allowNull: false,
        name: "districtId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.belongsTo(models.Province, {
      foreignKey: {
        allowNull: false,
        name: "provinceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.CartItem, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Order, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
