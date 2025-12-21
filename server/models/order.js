"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User);
      Order.hasMany(models.OrderItem);
    }
  }
  Order.init(
    {
      UserId: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
      status: DataTypes.STRING,
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Shipping addresss required",
          },
          notEmpty: {
            args: true,
            msg: "Shipping addresss required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
