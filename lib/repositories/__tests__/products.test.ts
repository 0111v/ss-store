import { Product, ProductInsert, ProductUpdate } from "@/types/products.types"
import { productsRepo } from "../products.repo"
import { createTestClient } from "@/lib/supabase/test-client"

const mockProduct: ProductInsert = {
  name: 'testProduct',
  quantity: 1,
  purchase_price: 10,
  sale_price: 10
}

const mockUpdates: ProductUpdate = {
  name: 'updatedProduct',
  quantity: 2,
}


jest.mock('../../supabase/server', () => ({
  createClient: () => createTestClient()
}))

describe('productsRepo', () => {
  let newProduct: Product | null

  beforeEach(async () => {
    const supabase = createTestClient()
    await supabase.auth.signInWithPassword({
      email: '1@gmail.com',
      password: '123456'
    })
    newProduct = await productsRepo.createProduct(mockProduct)
  })
  
  afterEach(async () => {
    const supabase = createTestClient()
    if (newProduct) {
      await productsRepo.deleteProduct(newProduct.id)
    }
    await supabase.auth.signOut()
  })

  describe('fetchProducts', () => {
    it('return an array of products', async () => {
      const products = await productsRepo.fetchProducts()
      expect(products).not.toHaveLength(0)
    })
  })

  describe('fetchProductById', () => {
    it('return a single product', async () => {
      const res = await productsRepo.fetchProductById(newProduct!.id)
      expect(res).not.toBe(null)
    })
  })

  describe('createProduct', () => {
    it('create a new product and return it', async () => {
      let newProduct2 = null
      try {
        newProduct2 = await productsRepo.createProduct(mockProduct)
        expect(newProduct2).not.toBe(null)
      } finally {
        if (newProduct2) await productsRepo.deleteProduct(newProduct2.id)  
      }
    })
  })

  describe('updateProduct', () => {
    it('update a product', async () => {
      const res = await productsRepo.updateProduct(newProduct!.id, mockUpdates)
      expect(res).not.toBe(null)
    })
  })

  describe('deleteProduct', () => {
    it('delete a product', async () => {
      await productsRepo.deleteProduct(newProduct!.id)
      const deletedProduct = await productsRepo.fetchProductById(newProduct!.id)
      expect(deletedProduct).toBe(null)
    })
  })
})