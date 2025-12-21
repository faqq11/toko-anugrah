"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product);
    }
  }
  Brand.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: "Brand name is required",
          },
          notEmpty: {
            args: true,
            msg: "Brand name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );
  return Brand;
};
