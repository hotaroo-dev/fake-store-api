import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IProduct } from './product'

interface ICart {
  product: IProduct
  count: number
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ICart[]>([])
  const isCartOpen = ref(false)
  const totalItemsCount = computed(() => cart.value.reduce((acc, { count }) => acc + count, 0))
  const totalPrice = computed(() =>
    cart.value.reduce((acc, { count, product: { price } }) => acc + count * price, 0).toFixed(2)
  )

  function toggleCartVisibility() {
    isCartOpen.value = !isCartOpen.value
  }

  function isItemInCart(id: number) {
    return cart.value.some((cartItem) => cartItem.product.id === id)
  }

  function addToCart(product: IProduct) {
    if (isItemInCart(product.id)) {
      cart.value = cart.value.map((cartItem) =>
        cartItem.product.id === product.id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
      )
    } else {
      cart.value.push({ product, count: 1 })
    }
  }

  function deleteCartItem(id: number) {
    cart.value = cart.value.filter((cartItem) => cartItem.product.id !== id)
  }

  function decreaseItemQuantity(id: number) {
    if (!isItemInCart(id)) return
    cart.value = cart.value.map((cartItem) =>
      cartItem.product.id === id ? { ...cartItem, count: cartItem.count - 1 } : cartItem
    )
    const idx = cart.value.findIndex((cartItem) => cartItem.count === 0)
    idx !== -1 && cart.value.splice(idx, 1)
  }

  return {
    cart,
    isCartOpen,
    totalItemsCount,
    totalPrice,
    toggleCartVisibility,
    addToCart,
    deleteCartItem,
    decreaseItemQuantity
  }
})
