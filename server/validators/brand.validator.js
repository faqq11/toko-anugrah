const { z } = require("zod");

const brandInputSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
});

module.exports = brandInputSchema;
