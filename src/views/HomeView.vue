<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'
import Spinner from '@/components/icons/Spinner.vue'

const store = useProductStore()

onBeforeMount(() => {
  !store.products.length && store.getProducts()
})
</script>

<template>
  <div class="col-span-1 md:col-span-3">
    <div v-if="store.loading" class="mt-20 flex justify-center text-blue-500">
      <Spinner />
    </div>
    <template v-else>
      <div
        v-if="store.products.length"
        class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
      >
        <div v-for="product in store.products" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
    </template>
  </div>
</template>
