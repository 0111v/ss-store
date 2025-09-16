import { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "../supabase/server"
import { Product, ProductInsert, ProductUpdate } from "@/types/products.types"

async function calldb<T>(fn: (supabase: SupabaseClient) => PromiseLike<{ data: unknown, error: unknown }>): Promise<T> {
  const supabase = await createClient()
  const { data, error } = await fn(supabase)
  if (error) throw error
  return data as T
}

export const productsRepo = {
  fetchProducts: () =>
    calldb<Product[]>((supabase) =>
      supabase.from('products').select('*').is('deleted_at', null).order('name', { ascending: true })
    ),

  fetchProductById: (id: string) =>
    calldb<Product | null>((supabase) =>
      supabase.from('products').select('*').eq('id', id).is('deleted_at', null).maybeSingle()
    ),

  createProduct: (product: ProductInsert) =>
    calldb<Product>((supabase) =>
      supabase.from('products').insert(product).select().single()
    ),

  updateProduct: (id: string, updates: ProductUpdate) =>
    calldb<Product>((supabase) =>
      supabase.from('products').update(updates).eq('id', id).select().single()
    ),

  deleteProduct: (id: string) =>
    calldb<void>((supabase) =>
      supabase.from('products').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    )
}
