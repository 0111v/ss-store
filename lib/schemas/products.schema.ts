import { z } from "zod";

export const productsValidation = {
  product: z.object({
    id: z.uuid(),
    user_id: z.uuid(),
    created_at: z.string(),
    name: z.string(),
    quantity: z.number(),
    purchase_price: z.number(),
    sale_price: z.number(),
  }),

  productInsert: z.object({
    name: z.string(),
    quantity: z.coerce.number().int().nonnegative(),
    purchase_price: z.coerce.number().nonnegative(),
    sale_price: z.coerce.number().nonnegative(),
  }),

  productUpdate: z.object({
    name: z.string().optional(),
    quantity: z.coerce.number().int().nonnegative().optional(),
    purchase_price: z.coerce.number().nonnegative().optional(),
    sale_price: z.coerce.number().nonnegative().optional(),
  })
}