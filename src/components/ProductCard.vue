<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { IProduct } from '@/stores/product'

withDefaults(defineProps<{ product: IProduct; allowQuantityChange?: boolean }>(), {
  allowQuantityChange: true
})

const { addToCart, decreaseItemQuantity } = useCartStore()
</script>

<template>
  <div class="rounded border border-zinc-200">
    <RouterLink :to="`/products/${product.id}`">
      <img class="aspect-[4/3] w-full object-contain p-4" :src="product.image" />
    </RouterLink>
    <div class="flex flex-col gap-3 p-4">
      <h2 class="w-9/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {{ product.title }}
      </h2>
      <div>
        <p>${{ product.price }}</p>
        <p class="w-9/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {{ product.description }}
        </p>
      </div>
      <div class="flex gap-6">
        <button
          class="btn mr-auto flex-1"
          :class="{ 'max-w-[16rem]': !allowQuantityChange }"
          @click="addToCart(product)"
        >
          Add to Cart
        </button>
        <template v-if="allowQuantityChange">
          <div class="flex gap-3">
            <button class="btn" @click="addToCart(product)">+</button>
            <button class="btn decrease" @click="decreaseItemQuantity(product.id)">-</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
