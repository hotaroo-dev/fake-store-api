<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'

const cartStore = useCartStore()

onBeforeMount(() => {
  cartStore.isCartOpen = true
})
</script>

<template>
  <div class="col-span-3">
    <div v-if="cartStore.cart.length" class="grid gap-8">
      <div
        v-for="cartItem in cartStore.cart"
        :key="cartItem.product.id"
        class="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-3"
      >
        <ProductCard :product="cartItem.product" :allow-quantity-change="false" />
        <div class="flex flex-row justify-between gap-4 lg:flex-col lg:items-start">
          <div class="flex items-center gap-4">
            <button
              class="h-10 rounded bg-blue-500 px-6 text-white active:translate-y-0.5"
              @click="cartStore.addToCart(cartItem.product)"
            >
              +
            </button>
            <span>{{ cartItem.count }}</span>
            <button
              class="h-10 rounded bg-yellow-500 px-6 active:translate-y-0.5"
              @click="cartStore.decreaseItemQuantity(cartItem.product.id)"
            >
              -
            </button>
          </div>
          <button
            class="h-10 rounded bg-red-500 px-7 text-white active:translate-y-0.5"
            @click="cartStore.deleteCartItem(cartItem.product.id)"
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="font-semibold">No cart</p>
    </div>
  </div>
</template>
