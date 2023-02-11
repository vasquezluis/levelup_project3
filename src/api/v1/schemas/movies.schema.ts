import { z } from "zod";

export const CreateMoviesSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      })
      .min(1),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Prices must be a number",
      })
      .nonnegative(),
    brand: z
      .string({
        required_error: "Brand is required",
        invalid_type_error: "Brand must be a string",
      })
      .min(1),
  }),
});
