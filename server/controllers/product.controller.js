const { Product, sequelize, Category, Brand } = require("../models/index");
const trimFields = require("../utils/trim-fields");
const productInputSchema = require("../validators/product.validator");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Category, through: { attributes: [] } },
          { model: Brand },
        ],
      });
      if (products.length < 1) throw new Error("DATA_NOT_FOUND");

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Product list retrieved successfully",
        data: products.map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.Brand.name,
          description: p.description,
          categories: p.Categories.map((cat) => cat.name),
          price: p.price,
          stock: p.stock,
        })),
      });
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
            BrandId: parsedInput.BrandId,
            price: parsedInput.price,
            stock: parsedInput.stock,
          },
          { transaction: t }
        );

        await newProduct.setCategories(parsedInput.category, {
          transaction: t,
        });

        await newProduct.reload({
          include: [
            {
              model: Category,
              attributes: ["name"],
              through: { attributes: [] },
            },
            {
              model: Brand,
              attributes: ["name"],
            },
          ],
          transaction: t,
        });

        return newProduct;
      });

      res.status(201).json({
        success: true,
        status_code: 201,
        message: "Product created successfully",
        data: {
          id: product.id,
          name: product.name,
          brand: product.Brand.name,
          description: product.description,
          categories: product.Categories.map((cat) => cat.name),
          price: product.price,
          stock: product.stock,
        },
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
