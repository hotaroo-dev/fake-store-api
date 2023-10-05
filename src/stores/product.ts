import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  image: string
}

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([])
  const product = ref<IProduct>()
  const loading = ref(false)

  async function fetchProducts() {
    loading.value = true
    const res = await fetch('https://fakestoreapi.com/products')
    const json = await res.json()
    return json as IProduct[]
  }

  async function getProducts() {
    const data = await fetchProducts()
    products.value = data
    loading.value = false
  }

  function getProduct(productId: string | string[]) {
    product.value = products.value.find((product) => product.id === +productId)
  }

  return { products, product, loading, getProducts, getProduct }
})
