import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(2).max(100),

  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/),

  description: z.string().optional(),

  logo: z.string().url().optional(),

  website: z.string().url().optional(),
});

export const updateBrandSchema = createBrandSchema.partial().extend({
  is_active: z.boolean().optional(),
});
