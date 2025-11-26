const { z } = require("zod");

const userInputSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z
    .string()
    .min(1, "Last name must not be empty if provided")
    .optional(),
  email: z.email().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().startsWith("0", "Phone number must start with 0"),
  address: z.string().min(1, "Address is required"),
});

const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

module.exports = { userInputSchema, loginInputSchema };
