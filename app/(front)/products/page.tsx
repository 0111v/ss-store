'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useFetchProducts } from "@/lib/queries/products.query"
import { AddProductDialog } from "./add-product-dialog"
import { LoadingState } from "@/components/ui/loading-state"

export default function DemoPage() {
  const { data, error, isLoading } = useFetchProducts()

  return (
    <div className="min-h-screen container mx-auto">
      <LoadingState
        loading={isLoading}
        error={error}
        empty={!data}
      >
        <DataTable columns={columns} data={data!} />
        <AddProductDialog />
      </LoadingState>
    </div>
  )
}