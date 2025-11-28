const { includes } = require("zod");
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
      const { id } = req.params;

      const product = await Product.findByPk(+id, {
        include: [
          { model: Category, through: { attributes: [] } },
          { model: Brand },
        ],
      });
      if (!product) throw new Error("DATA_NOT_FOUND");

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Product retrieved successfully",
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
      const { id } = req.params;
      let input = req.body;

      input = trimFields(input, ["name", "description"]);

      const parsedInput = productInputSchema.parse(input);

      const result = await sequelize.transaction(async (t) => {
        const product = await Product.findByPk(+id, {
          include: [
            { model: Category, through: { attributes: [] } },
            { model: Brand },
          ],
          transaction: t,
        });
        if (!product) throw new Error("DATA_NOT_FOUND");

        const { category, ...productFields } = parsedInput;

        await product.update(productFields, { transaction: t });

        if (category && category.length > 0) {
          await product.setCategories(category, { transaction: t });
        }

        return product;
      });

      await result.reload({
        include: [
          { model: Category, through: { attributes: [] } },
          { model: Brand },
        ],
      });

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Product updated successfully",
        data: {
          id: result.id,
          name: result.name,
          brand: result.Brand.name,
          description: result.description,
          categories: result.Categories.map((cat) => cat.name),
          price: result.price,
          stock: result.stock,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(+id, {
        include: [
          { model: Category, through: { attributes: [] } },
          { model: Brand },
        ],
      });
      if (!product) throw new Error("DATA_NOT_FOUND");

      await product.destroy();

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Product deleted successfully",
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
}

module.exports = ProductController;
