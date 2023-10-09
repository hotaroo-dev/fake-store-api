import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const api = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([])
  const product = ref<IProduct>()
  const loading = ref(false)

  async function fetchProducts() {
    loading.value = true
    const res = await fetch(api)
    const json = await res.json()
    return json as IProduct[]
  }

  async function getProducts() {
    const data = await fetchProducts()
    products.value = data
    loading.value = false
  }

  async function getProduct(productId: string | string[]) {
    loading.value = true
    const res = await fetch(`${api}/${productId}`)
    const data = (await res.json()) as IProduct
    product.value = data
    loading.value = false
  }

  return { products, product, loading, getProducts, getProduct }
})
