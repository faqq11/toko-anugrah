const { User } = require("../models/index");
const { checkPassword } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");
const trimFields = require("../utils/trim-fields");
const {
  userInputSchema,
  loginInputSchema,
} = require("../validators/user.validator");
const { Op, fn, col } = require("sequelize");

class UserController {
  static async register(req, res, next) {
    try {
      const userInput = { ...req.body };
      const parsedInput = userInputSchema.parse(userInput);

      trimFields(parsedInput, [
        "first_name",
        "last_name",
        "email",
        "phone",
        "address",
      ]);

      const user = await User.create(parsedInput);

      res.status(201).json({
        success: true,
        status_code: res.statusCode,
        message: "Account created successfully",
        data: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const userInput = req.body;
      const parsedInput = loginInputSchema.parse(userInput);

      const user = await User.findOne({ where: { email: parsedInput.email } });
      if (!user) throw new Error("INVALID_CREDENTIAL");
      if (!checkPassword(parsedInput.password, user.password))
        throw new Error("INVALID_CREDENTIAL");

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = signToken(payload);

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Login successful",
        data: {
          access_token: token,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: [
          "id",
          [fn("CONCAT", col("first_name"), " ", col("last_name")), "name"],
          "email",
          "role",
          "phone",
          "address",
        ],
      });
      if (users.length < 1) throw new Error("DATA_NOT_FOUND");

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "User list retrieved successfully",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getOneUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(+id);
      if (!user) throw new Error("DATA_NOT_FOUND");

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "User retrieved successfully",
        data: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const userInput = req.body;

      const parsedInput = userInputSchema.parse(userInput);

      trimFields(parsedInput, [
        "first_name",
        "last_name",
        "email",
        "phone",
        "address",
      ]);

      const user = await User.findByPk(+id);
      if (!user) throw new Error("DATA_NOT_FOUND");

      const isUpdatingPayload = parsedInput.email !== user.email;

      await user.update(parsedInput);

      await user.reload();

      const response = {
        success: true,
        status_code: 200,
        message: "User updated successfully",
        data: {
          id: +id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
      };

      if (isUpdatingPayload) {
        const newPayload = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        response.token = signToken(newPayload);
        response.message = "User updated successfully. Please use new token";
      }

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async deleteuser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(+id);
      if (!user) throw new Error("DATA_NOT_FOUND");

      await user.destroy();

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "User deleted successfully",
        data: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
