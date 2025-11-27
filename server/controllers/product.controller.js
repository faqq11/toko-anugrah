const { Product, sequelize } = require("../models/index");
const trimFields = require("../utils/trim-fields");
const productInputSchema = require("../validators/product.validator");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async getOneProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    try {
      let input = req.body;
      input = trimFields(input, ["name", "description"]);

      const parsedInput = productInputSchema.parse(input);

      const product = await sequelize.transaction(async (t) => {
        const newProduct = await Product.create(
          {
            name: parsedInput.name,
            description: parsedInput.description,
            brand_id: parsedInput.brand_id,
            price: parsedInput.price,
            stock: parsedInput.stock,
          },
          { transaction: t }
        );

        await newProduct.setCategories(parsedInput.category, {
          transaction: t,
        });

        return newProduct;
      });

      res.status(201).json({
        success: true,
        status_code: 201,
        message: "Product created successfully",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
