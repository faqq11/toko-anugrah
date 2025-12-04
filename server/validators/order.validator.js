const { z } = require("zod");

const itemsInputSchema = z.object({
  id: z
    .number("Product ID is required")
    .int("Product ID must be an integer")
    .positive("Product ID must be positive"),

  quantity: z
    .number("Product quantity is required")
    .int("Product quantity must be an integer")
    .positive("Product quantity must be positive")
    .min(1, "Product quantity must be at least 1"),

  price: z
    .number()
    .positive("Price must be greater than 0")
    .min(1, "Price must be at least 1"),
});

const orderInputSchema = z.object({
  shipping_address: z
    .string()
    .min(10, "Shipping address must be at least 10 characters"),
  items: z.array(itemsInputSchema).min(1, "Order must contain at least 1 item"),
});

module.exports = { itemsInputSchema, orderInputSchema };
