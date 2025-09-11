"use client"

import { Product } from "@/types/products.types"
import { ColumnDef } from "@tanstack/react-table"
import { EditProductDialog } from "./edit-product-dialog"
import { DeleteProductButton } from "./delete-product-button"



export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "purchase_price",
    header: "Purchase Price",
  },
  {
    accessorKey: "sale_price",
    header: "Sale Price"
  },
  {
    id: "actions",
    header: '',
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex justify-end gap-3">
          <EditProductDialog id={product.id}/>
          <DeleteProductButton id={product.id}/>
        </div>
      )
    }
  }
]