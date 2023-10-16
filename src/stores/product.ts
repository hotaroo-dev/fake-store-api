import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const api_url = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([])
  const productsByCategory = ref<IProduct[]>([])
  const product = ref<IProduct>()
  const categories = ref<string[]>([])
  const priceRange = ref<number[]>([])
  const loading = ref(false)

  async function fetchProducts() {
    loading.value = true
    const res = await fetch(api_url)
    const json = await res.json()
    return json as IProduct[]
  }

  async function getProducts() {
    const data = await fetchProducts()
    products.value = data
    loading.value = false
  }

  async function fetchProduct(productId: string | string[]) {
    loading.value = true
    const res = await fetch(`${api_url}/${productId}`)
    const json = await res.json()
    return json as IProduct
  }

  async function getCategories() {
    const res = await fetch(`${api_url}/categories`)
    const data = await res.json()
    categories.value = data
  }

  async function fetchProductsByCategory(categoryName: string | string[]) {
    loading.value = true
    const res = await fetch(`${api_url}/category/${categoryName}`)
    const json = await res.json()
    return json as IProduct[]
  }

  async function getProductsByCategory(categoryName: string | string[]) {
    const data = await fetchProductsByCategory(categoryName)
    productsByCategory.value = data
    loading.value = false
  }

  return {
    products,
    productsByCategory,
    product,
    loading,
    categories,
    priceRange,
    getProducts,
    getProductsByCategory,
    getCategories,
    fetchProduct
  }
})
