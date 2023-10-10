<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductPagination from '@/components/ProductPagination.vue'

const productStore = useProductStore()
const route = useRoute()
const categoryName = route.params.categoryName

onBeforeMount(async () => {
  if (categoryName) {
    !Object.keys(productStore.productsByCategory).length && productStore.getProductsByCategory()
  } else {
    !productStore.products.length && productStore.getProducts()
  }
})
</script>

<template>
  <ProductFilter />
  <ProductPagination
    :products="
      categoryName
        ? productStore.productsByCategory[$route.params.categoryName as string] || []
        : productStore.products
    "
    :loading="productStore.loading"
  />
</template>
