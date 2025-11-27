const { z } = require("zod");

const productInputSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),

  BrandId: z
    .number("Product brand is required")
    .int("Product brand ID must be an integer")
    .positive("Product brand ID must be positive"),

  category: z
    .array(
      z
        .number()
        .int("Category ID must be an integer")
        .positive("Category ID must be positive")
    )
    .optional(),

  description: z.string().min(1, "Product description is required"),

  price: z
    .number()
    .positive("Price must be greater than 0")
    .min(1, "Price must be at least 1"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative")
    .min(0, "Stock must be at least 0"),
});

module.exports = productInputSchema;
