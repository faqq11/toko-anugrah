"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "First name required (Tingkat migration)",
          },
        },
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email format (Tingkat migration)",
          },
          notNull: {
            args: true,
            msg: "Email is required (Tingkat migration)",
          },
          notEmpty: {
            args: true,
            msg: "Email is required (Tingkat migration)",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password is required (Tingkat migration)",
          },
          notEmpty: {
            args: true,
            msg: "Password is required (Tingkat migration)",
          },
        },
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "guest",
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Phone number is required (Tingkat migration)",
          },
          notEmpty: {
            args: true,
            msg: "Phone number is required (Tingkat migration)",
          },
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Address is required (Tingkat migration)",
          },
          notEmpty: {
            args: true,
            msg: "Address is required (Tingkat migration)",
          },
        },
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
    await queryInterface.dropTable("Users");
  },
};
