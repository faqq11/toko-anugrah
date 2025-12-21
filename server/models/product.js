"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.OrderItem);
      Product.belongsTo(models.Brand);
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
      });
      Product.hasMany(models.ProductCategory);
      Product.hasMany(models.CartItem);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Product name required",
          },
          notEmpty: {
            args: true,
            msg: "Product name required",
          },
        },
      },
      BrandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Brand name required",
          },
          notEmpty: {
            args: true,
            msg: "Brand name required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Product description required",
          },
          notEmpty: {
            args: true,
            msg: "Product description required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
