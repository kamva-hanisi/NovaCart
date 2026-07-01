import { z } from "zod";

export const createProductSchema = z.object({
  category_id: z.number(),

  brand_id: z.number(),

  name: z.string().min(3).max(255),

  slug: z.string().min(3).max(255),

  sku: z.string().min(3).max(100),

  short_description: z.string().optional(),

  description: z.string().optional(),

  price: z.number().positive(),

  sale_price: z.number().positive().optional(),

  stock_quantity: z.number().int().min(0),

  thumbnail: z.string().optional(),

  is_featured: z.boolean().optional(),

  status: z.enum(["ACTIVE", "INACTIVE", "OUT_OF_STOCK", "DRAFT"]).optional(),
});
