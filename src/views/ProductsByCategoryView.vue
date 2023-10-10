<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductPagination from '@/components/ProductPagination.vue'

const productStore = useProductStore()
const route = useRoute()

onBeforeMount(() => {
  productStore.getProdutsByCategory(route.params.categoryName)
})
</script>

<template>
  <ProductFilter />
  <ProductPagination :products="productStore.productsByCategory" :loading="productStore.loading" />
</template>
