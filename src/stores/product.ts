import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  image: string
  rating: {
    rate: number
  }
}

const API_URL = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([])
  const productsByCategory = ref<IProduct[]>([])
  const product = ref<IProduct>()
  const categories = ref<string[]>([])
  const priceRange = ref<number[]>([])
  const loading = ref(false)

  async function fetchProducts() {
    loading.value = true
    const res = await fetch(API_URL)
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
    const res = await fetch(`${API_URL}/${productId}`)
    const json = await res.json()
    return json as IProduct
  }

  async function getCategories() {
    const res = await fetch(`${API_URL}/categories`)
    const data = await res.json()
    categories.value = data
  }

  async function fetchProductsByCategory(categoryName: string | string[]) {
    loading.value = true
    const res = await fetch(`${API_URL}/category/${categoryName}`)
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
