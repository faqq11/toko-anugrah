"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.OrderItem);
      Product.belongsTo(models.Brand);
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
      });
      Product.hasMany(models.ProductCategory);
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
      brand_id: {
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
