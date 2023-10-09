import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { IProduct } from './product'

interface ICart {
  product: IProduct
  count: number
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ICart[]>([])
  const totalItemsCount = computed(() => cart.value.reduce((acc, { count }) => acc + count, 0))
  const totalPrice = computed(() =>
    cart.value.reduce((acc, { count, product: { price } }) => acc + count * price, 0).toFixed(2)
  )

  watch(cart, (newCarts) => {
    for (const deleteCart of newCarts.filter((cart) => cart.count === 0)) {
      const index = cart.value.findIndex((cart) => cart.product.id === deleteCart.product.id)
      cart.value.splice(index, 1)
    }
  })

  function isItemInCart(id: number) {
    return cart.value.some((cart) => cart.product.id === id)
  }

  function addToCart(product: IProduct) {
    if (isItemInCart(product.id)) {
      cart.value = cart.value.map((cart) =>
        cart.product.id === product.id ? { ...cart, count: cart.count + 1 } : cart
      )
    } else {
      cart.value.push({ product, count: 1 })
    }
  }

  function deleteCartItem(id: number) {
    cart.value = cart.value.filter((cart) => cart.product.id !== id)
  }

  function decreaseItemQuantity(id: number) {
    if (!isItemInCart(id)) return
    cart.value = cart.value.map((cart) =>
      cart.product.id === id ? { ...cart, count: cart.count - 1 } : cart
    )
  }

  return { cart, totalItemsCount, totalPrice, addToCart, deleteCartItem, decreaseItemQuantity }
})
