<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore, type IProduct } from '@/stores/product'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'

const { addToCart } = useCartStore()
const productStore = useProductStore()
const product = ref<IProduct>()

const route = useRoute()

onBeforeMount(async () => {
  product.value = await productStore.fetchProduct(route.params.productId)
  productStore.loading = false
})
</script>

<template>
  <div class="col-span-3">
    <div v-if="productStore.loading" class="mt-10 flex justify-center text-blue-500">
      <SpinnerIcon />
    </div>
    <div v-if="product" class="grid gap-10 lg:grid-cols-3">
      <img class="aspect-square w-full object-contain" :src="product.image" />
      <div class="space-y-4 lg:col-span-2">
        <h2>{{ product?.title }}</h2>
        <p class="text-zinc-600">{{ product.description }}</p>
        <div class="flex items-center justify-between">
          <button class="btn" @click="addToCart(product)">Add to Cart</button>
          <p class="font-bold">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
