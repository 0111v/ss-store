import { productsRepo } from "@/lib/repositories/products.repo";
import { productsValidation } from "@/lib/schemas/products.schema";
import { apiRun } from "@/lib/utils/api-run";
import { NextRequest } from "next/server";

export const GET = async () => apiRun(
  () => productsRepo.fetchProducts()
)
 
export const POST = async (req: NextRequest) => apiRun(
  async () => {
    const body = await req.json()
    const validatedBody = productsValidation.productInsert.parse(body)
    const res = await productsRepo.createProduct(validatedBody)
    return res
  }
)