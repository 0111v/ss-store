'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { productsValidation } from "@/lib/schemas/products.schema"
import { Product, ProductInsert } from "@/types/products.types"
import React, { useEffect, useState } from "react"

export function ProductDialog({
  onSubmit, isPending, product, dialogContent
}: {
  onSubmit: (product: ProductInsert) => Promise<void>
  isPending: boolean 
  product?: Product | undefined 
  dialogContent: Record<'title' | 'description' | 'button', string>
}) { 
  const [showModal, setShowModal] = useState(false)  
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchase, setPurchase] = useState('')
  const [sale, setSale] = useState('')

  useEffect(() => {
    if (product) {
      setName(product.name)
      setQuantity(product.quantity.toString())
      setPurchase(product.purchase_price.toString())
      setSale(product.sale_price.toString())
    }
  }, [product])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault()
  const formData = {
    name,
    quantity,
    purchase_price: purchase,
    sale_price: sale
  }
  const validatedForm = productsValidation.productInsert.parse(formData)
  try {
    await onSubmit(validatedForm)
    setName("")
    setQuantity("")
    setPurchase("")
    setSale("")
    setShowModal(false)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setShowModal(true)}>{dialogContent.button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogDescription>
            {dialogContent.description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity-1">Quantity</Label>
              <Input id="quantity-1" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="purchase-1">Purchase Price</Label>
              <Input id="purchase-1" name="purchase" value={purchase} onChange={(e) => setPurchase(e.target.value)}/>
            </div>            
            <div className="grid gap-3">
              <Label htmlFor="sale-1">Sale Price</Label>
              <Input id="sale-1" name="sale" value={sale} onChange={(e) => setSale(e.target.value)}/>
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}