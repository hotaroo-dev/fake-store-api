import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  image: string
}

interface IProductByCategory {
  [key: string]: IProduct[]
}

const api = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([])
  const productsByCategory = ref<IProductByCategory>({})
  const product = ref<IProduct>()
  const categories = ref<string[]>([])
  const priceRange = ref([0, 1000])
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

  async function fetchProduct(productId: string | string[]) {
    loading.value = true
    const res = await fetch(`${api}/${productId}`)
    const json = await res.json()
    return json as IProduct
  }

  async function getCategories() {
    const res = await fetch(`${api}/categories`)
    const data = await res.json()
    categories.value = data
  }

  async function getProductsByCategory() {
    loading.value = true
    !categories.value.length && (await getCategories())
    const data = await Promise.all(
      categories.value.map((categoryName) =>
        fetch(`${api}/category/${categoryName}`).then((res) => res.json())
      )
    )
    for (const [idx, category] of categories.value.entries()) {
      productsByCategory.value[category] = data[idx]
    }
    loading.value = false
  }

  // async function fetchProductsByCategory(categoryName: string | string[]) {
  //   loading.value = true
  //   const res = await fetch(`${api}/category/${categoryName}`)
  //   const json = await res.json()
  //   return json as IProduct[]
  // }
  //
  // async function getProdutsByCategory(categoryName: string | string[]) {
  //   const data = await fetchProductsByCategory(categoryName)
  //   productsByCategory.value = data
  //   loading.value = false
  // }

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
