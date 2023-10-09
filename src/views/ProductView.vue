<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'

const productStore = useProductStore()
const { addToCart } = useCartStore()
const route = useRoute()

onBeforeMount(() => {
  productStore.getProduct(route.params.productId)
})
</script>

<template>
  <div class="col-span-3">
    <div v-if="productStore.loading" class="mt-10 flex justify-center text-blue-500">
      <SpinnerIcon />
    </div>
    <div v-if="productStore.product" class="grid gap-10 lg:grid-cols-3">
      <img class="aspect-square w-full object-contain" :src="productStore.product.image" />
      <div class="space-y-4 lg:col-span-2">
        <h2>{{ productStore.product?.title }}</h2>
        <p class="text-zinc-600">{{ productStore.product.description }}</p>
        <div class="flex items-center justify-between">
          <button class="btn" @click="addToCart(productStore.product)">Add to Cart</button>
          <p class="font-bold">${{ productStore.product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
