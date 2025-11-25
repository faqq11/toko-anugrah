"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Product name is required (Tingkat migration)",
          },
          notEmpty: {
            args: true,
            msg: "Product name is required (Tingkat migration)",
          },
        },
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Brand is required (Tingkat migration)",
          },
          notEmpty: {
            args: true,
            msg: "Brand is required (Tingkat migration)",
          },
        },
        references: {
          model: "Brands",
          key: "id",
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Product description is required (Tingkat migration)",
          },
          notEmpty: {
            args: true,
            msg: "Product description is required (Tingkat migration)",
          },
        },
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
