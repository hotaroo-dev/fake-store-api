<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'

const cartStore = useCartStore()
const productStore = useProductStore()

onBeforeMount(() => {
  cartStore.isCartOpen = true
  !productStore.products.length && productStore.getProducts()
})
</script>

<template>
  <div class="col-span-1 md:col-span-3">
    <div v-if="productStore.loading" class="mt-20 flex justify-center text-blue-500">
      <SpinnerIcon />
    </div>
    <template v-else>
      <div
        v-if="productStore.products.length"
        class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
      >
        <div v-for="product in productStore.products" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
    </template>
  </div>
</template>
