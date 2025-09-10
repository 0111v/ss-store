'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useFetchProducts } from "@/lib/queries/products.query"
import { AddProductDialog } from "./add-product-dialog"

export default function DemoPage() {
  const { data, error, isLoading } = useFetchProducts()

  if (isLoading) return <div className="flex min-h-screen justify-center items-center">Loading</div>
  if (error) return <div className="flex min-h-screen justify-center items-center">Error</div>
  if (!data) return


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <AddProductDialog />
    </div>
  )
}