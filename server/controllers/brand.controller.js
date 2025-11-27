const { Brand } = require("../models/index");
const trimFields = require("../utils/trim-fields");
const brandInputSchema = require("../validators/brand.validator");

class BrandController {
  static async getAllBrand(req, res, next) {
    try {
      console.log("INI DARI BRAND CONTROLLER");
    } catch (err) {
      next(err);
    }
  }

  static async addBrand(req, res, next) {
    try {
      let input = req.body;
      input = trimFields(input, ["name"]);

      const parsedInput = brandInputSchema.parse(input);

      const brand = await Brand.create(parsedInput);

      res.status(201).json({
        success: true,
        status_code: 201,
        message: "Brand created successfully",
        data: {
          id: brand.id,
          name: brand.name,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBrand(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BrandController;
