module.exports = (sequelize, DataTypes) => {
  const Geography = sequelize.define(
    "Geography",
    {
      name: {
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

  Geography.associate = (models) => {
    Geography.hasMany(models.Province, {
      foreignKey: {
        allowNull: false,
        name: "geographyId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Geography;
};
