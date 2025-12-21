"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Product);
      ProductCategory.belongsTo(models.Category);
    }
  }
  ProductCategory.init(
    {
      ProductId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductCategory",
    }
  );
  return ProductCategory;
};
