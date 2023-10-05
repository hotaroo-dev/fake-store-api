import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { IProduct } from './product'

interface ICart {
  product: IProduct
  count: number
}

export const useCartStore = defineStore('carts', () => {
  const carts = ref<ICart[]>([])
  const count = computed(() => carts.value.reduce((acc, { count }) => acc + count, 0))
  const total = computed(() =>
    carts.value.reduce((acc, { count, product: { price } }) => acc + count * price, 0).toFixed(2)
  )

  watch(carts, (newCarts) => {
    for (const deleteCart of newCarts.filter((cart) => cart.count === 0)) {
      const index = carts.value.findIndex((cart) => cart.product.id === deleteCart.product.id)
      carts.value.splice(index, 1)
    }
  })

  function contains(id: number) {
    return carts.value.some((cart) => cart.product.id === id)
  }

  function addToCart(product: IProduct) {
    if (contains(product.id)) {
      carts.value = carts.value.map((cart) =>
        cart.product.id === product.id ? { ...cart, count: cart.count + 1 } : cart
      )
    } else {
      carts.value.push({ product, count: 1 })
    }
  }

  function deleteCart(id: number) {
    carts.value = carts.value.filter((cart) => cart.product.id !== id)
  }

  function decreaseCount(id: number) {
    if (!contains(id)) return
    carts.value = carts.value.map((cart) =>
      cart.product.id === id ? { ...cart, count: cart.count - 1 } : cart
    )
  }

  return { carts, count, total, addToCart, deleteCart, decreaseCount }
})
