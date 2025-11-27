const { Category } = require("../models/index");
const trimFields = require("../utils/trim-fields");
const categoryInputSchema = require("../validators/category.validator");

class CategoryController {
  static async getAllCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      let input = req.body;
      input = trimFields(input, ["name"]);

      const parsedInput = categoryInputSchema.parse(input);

      const category = await Category.create(parsedInput);

      res.status(201).json({
        success: true,
        status_code: 201,
        message: "Category created successfully",
        data: {
          id: category.id,
          name: category.name,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
