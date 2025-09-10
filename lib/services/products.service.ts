import { Product, ProductInsert, ProductUpdate } from "@/types/products.types"
import { serviceRun } from "@/lib/utils/service-run";

interface ProductsService {
  fetchProducts: () => Promise<Product[]>
  fetchProductById: (id: string) => Promise<Product>
  createProduct: (product: ProductInsert) => Promise<Product>
  updateProduct: (id: string, updates: ProductUpdate) => Promise<Product>
  deleteProduct: (id: string) => Promise<string>
}

export const productsService: ProductsService = {
  fetchProducts: async () => await serviceRun({ method: 'GET' }),
  fetchProductById: async (id) => await serviceRun({ method: 'GET', id}),
  createProduct: async (product) => serviceRun({ method: 'POST', body: product }),
  updateProduct: async (id, updates) => serviceRun({ method: 'PUT', id, body: updates }),
  deleteProduct: (id) => serviceRun({ method: 'DELETE', id })
}