'use client'

import { useCreateProduct } from "@/lib/queries/products.query"
import { ProductInsert } from "@/types/products.types"
import { ProductDialog } from "./product-dialog"

export function AddProductDialog() {
  const createMutation = useCreateProduct()
  const { isPending } = createMutation 

  const handleCreate = async (product: ProductInsert): Promise<void> => {
    await createMutation.mutateAsync(product)
  }

  const dialogContent = {
    title: 'Add Product',
    description: 'Add a product here',
    button: 'Add Product'
  }

  return (
    <ProductDialog 
      onSubmit={handleCreate} 
      isPending={isPending} 
      dialogContent={dialogContent}
    />
  )
}
