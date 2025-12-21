"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: "CASCADE",
      });
      Cart.hasMany(models.CartItem, {
        foreignKey: "CartId",
        onDelete: "CASCADE",
      });
    }

    async updateTotal() {
      const CartItem = sequelize.models.CartItem;
      const items = await CartItem.findAll({
        where: { CartId: this.id },
      });

      const total = items.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);

      this.total_amount = total;
      await this.save();
      return this;
    }
  }
  Cart.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
