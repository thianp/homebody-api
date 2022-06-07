module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
      "Payment",
      {
        status: {
          type: DataTypes.ENUM('PENDING', 'COMPLETED'),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        paymentSlip: {
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

    Payment.associate = models => {
      Payment.belongsTo(models.Order, {
        foreignKey: {
          allowNull: false,
          name: "orderId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  
    return Payment;
  };
  