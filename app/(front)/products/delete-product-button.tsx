'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/lib/queries/products.query";

export function DeleteProductButton({ id }: {id: string}) {
  const deleteMutation = useDeleteProduct()
  const { isPending } = deleteMutation

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant={"destructive"} disabled={isPending}>
        {isPending ? 'Deleting' : 'Delete'}
      </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}