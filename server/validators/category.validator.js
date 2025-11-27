const { z } = require("zod");

const categoryInputSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

module.exports = categoryInputSchema;
