import { productsRepo } from "@/lib/repositories/products.repo";
import { productsValidation } from "@/lib/schemas/products.schema";
import { apiRun } from "@/lib/utils/api-run";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params
  return apiRun(() => productsRepo.fetchProductById(id))
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params
  return apiRun(
    async () => {
      const body = await req.json()
      const validatedBody = productsValidation.productUpdate.parse(body) 
      const res = await productsRepo.updateProduct(id, validatedBody)
      return res
    }
  )
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params
  return apiRun(
    () => productsRepo.deleteProduct(id)
  )
}

