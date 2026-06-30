import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100),

  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/),

  description: z.string().optional(),

  image: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  is_active: z.boolean().optional(),
});
