'use client'

import { useFetchProductById, useUpdateProduct } from "@/lib/queries/products.query"
import { ProductUpdate } from "@/types/products.types"
import { ProductDialog } from "./product-dialog"

export function EditProductDialog({ id }: {id: string}) {
  const updateMutation = useUpdateProduct()
  const { data: product } = useFetchProductById(id)
  const { isPending } = updateMutation

  const handleEdit = async (updates: ProductUpdate) => {
    await updateMutation.mutateAsync({id, updates})
  }

  const dialogContent = {
    title: 'Edit',
    description: 'Edit a product here',
    button: 'Edit',
  }

  return (
    <ProductDialog 
      onSubmit={handleEdit} 
      isPending={isPending} 
      product={product} 
      dialogContent={dialogContent}
    />
  )
}