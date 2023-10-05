<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'

const store = useCartStore()
</script>

<template>
  <div class="col-span-3">
    <div v-if="store.carts.length" class="grid gap-8">
      <div
        v-for="cart in store.carts"
        :key="cart.product.id"
        class="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-3"
      >
        <ProductCard :product="cart.product" :shop="true" />
        <div class="flex flex-row justify-between gap-4 lg:flex-col lg:items-start">
          <div class="flex items-center gap-4">
            <button
              class="h-10 rounded bg-blue-500 px-6 text-white active:translate-y-0.5"
              @click="store.addToCart(cart.product)"
            >
              +
            </button>
            <span>{{ cart.count }}</span>
            <button
              class="h-10 rounded bg-yellow-500 px-6 active:translate-y-0.5"
              @click="store.decreaseCount(cart.product.id)"
            >
              -
            </button>
          </div>
          <button
            class="h-10 rounded bg-red-500 px-7 text-white active:translate-y-0.5"
            @click="store.deleteCart(cart.product.id)"
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
