<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore, type IProduct } from '@/stores/product'
import ProductCard from './ProductCard.vue'
import SpinnerIcon from './icons/SpinnerIcon.vue'

const offset = 6

const props = defineProps<{ products?: IProduct[] }>()
const route = useRoute()
const page = +(route.query.page || 0)
const start = offset * page

const productStore = useProductStore()
const filteredProducts = computed(() =>
  props.products?.length ? props.products : productStore.products
)

onBeforeMount(() => {
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
        <div v-for="product in filteredProducts.slice(start, start + offset)" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
      <!-- <div class="mt-4 flex justify-end gap-4"> -->
      <!--   <RouterLink -->
      <!--     class="block rounded bg-red-500 px-4 py-2 text-center text-white active:translate-y-0.5" -->
      <!--     :to="`products?page=${page - 1 < 0 ? 0 : page - 1}`" -->
      <!--   > -->
      <!--     prev -->
      <!--   </RouterLink> -->
      <!--   <RouterLink -->
      <!--     class="block rounded bg-blue-500 px-4 py-2 text-center text-white active:translate-y-0.5" -->
      <!--     :to="`/products?page=${offset * (page + 1) > filteredProducts.length ? page : page + 1}`" -->
      <!--   > -->
      <!--     next -->
      <!--   </RouterLink> -->
      <!-- </div> -->
    </template>
  </div>
</template>
