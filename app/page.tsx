'use client'

import { useFetchProducts } from "@/lib/queries/products.query"
import { AddProductDialog } from "./(front)/products/add-product-dialog"
import { columns } from "./(front)/products/columns"
import { DataTable } from "./(front)/products/data-table"
import { Hero1 } from "@/components/hero1"


export default function Home() {
  const { data, error, isLoading } = useFetchProducts()

  if (isLoading) return <div className="flex min-h-screen justify-center items-center">Loading</div>
  if (error) return <div className="flex min-h-screen justify-center items-center">Error</div>
  if (!data) return


  return (
    <div className="flex min-h-screen justify-center items-center px-20">
      <Hero1 />

    </div>
  )
}
