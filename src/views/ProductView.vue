<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import Spinner from '@/components/icons/Spinner.vue'

const store = useProductStore()
const { addToCart } = useCartStore()
const route = useRoute()

onBeforeMount(async () => {
  !store.products.length && (await store.getProducts())
  store.getProduct(route.params.productId)
})
</script>

<template>
  <div class="col-span-3">
    <div v-if="store.loading" class="mt-10 flex justify-center text-blue-500">
      <Spinner />
    </div>
    <div v-if="store.product" class="grid gap-10 lg:grid-cols-3">
      <img class="aspect-square w-full object-contain" :src="store.product.image" />
      <div class="space-y-4 lg:col-span-2">
        <h2>{{ store.product?.title }}</h2>
        <p class="text-zinc-600">{{ store.product.description }}</p>
        <div class="flex items-center justify-between">
          <button class="btn" @click="addToCart(store.product)">Add to Cart</button>
          <p class="font-bold">${{ store.product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
