import { z } from "zod";

export const productsValidation = {
  product: z.object({
    id: z.uuid(),
    user_id: z.uuid(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
    name: z.string(),
    quantity: z.number(),
    purchase_price: z.number(),
    sale_price: z.number(),
    code: z.string().nullable()
  }),

  productInsert: z.object({
    name: z.string(),
    quantity: z.number().int().nonnegative(),
    purchase_price: z.number().nonnegative(),
    sale_price: z.number().nonnegative(),
    code: z.string().min(1).max(50).optional()
  }),

  productUpdate: z.object({
    name: z.string().optional(),
    quantity: z.coerce.number().int().nonnegative().optional(),
    purchase_price: z.coerce.number().nonnegative().optional(),
    sale_price: z.coerce.number().nonnegative().optional(),
    code: z.string().min(1).max(50).optional()
  })
}
