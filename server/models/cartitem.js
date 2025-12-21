"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: "CartId",
        onDelete: "CASCADE",
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
    }
  }
  CartItem.init(
    {
      CartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
