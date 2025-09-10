'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../stores/auth.store"
import { productsService } from "../services/products.service"
import { ProductInsert, ProductUpdate } from "@/types/products.types"

const productsKeys = {
  products: (userId?: string | null) => ['products', userId],
  product: (id: string, userId?: string) => ['products', userId, id] 
}

const useInitQuery = () => {
  const queryClient = useQueryClient()
  const user = useAuthStore(state => state.user)
  return { queryClient, user }
}

export const useFetchProducts = () => {
  const { user } = useInitQuery()

  return useQuery({
    queryKey: productsKeys.products(user?.id),
    queryFn: () => productsService.fetchProducts(),
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.id
  })
}

export const useFetchProductById = (id: string) => {
  const { user } = useInitQuery()

  return useQuery({
    queryKey: productsKeys.product(id, user?.id),
    queryFn: () => productsService.fetchProductById(id),
    enabled: !!user?.id
  })
}

export const useCreateProduct = () => {
  const { user, queryClient } = useInitQuery()

  return useMutation({
    mutationFn: (product: ProductInsert) => productsService.createProduct(product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKeys.products(user?.id)})
  })
}

export const useUpdateProduct = () => {
  const { user, queryClient } = useInitQuery()

  return useMutation({
    mutationFn: ({id, updates}: {id: string, updates: ProductUpdate}) => productsService.updateProduct(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKeys.products(user?.id)})
  })
}

export const useDeleteProduct = () => {
  const { user, queryClient } = useInitQuery()

  return useMutation({
    mutationFn: (id: string) => productsService.deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKeys.products(user?.id)})
  })
}