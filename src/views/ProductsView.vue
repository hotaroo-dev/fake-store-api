<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductPagination from '@/components/ProductPagination.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const route = useRoute()
const categoryName = route.params.categoryName

onBeforeMount(() => {
  cartStore.isCartOpen = false
  if (categoryName) {
    productStore.getProductsByCategory(categoryName)
  } else {
    !productStore.products.length && productStore.getProducts()
  }
})
</script>

<template>
  <div class="col-span-4 grid gap-10 lg:grid-cols-4">
    <ProductFilter />
    <ProductPagination
      :products="categoryName ? productStore.productsByCategory : productStore.products"
      :loading="productStore.loading"
    />
  </div>
</template>
