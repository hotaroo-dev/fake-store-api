<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useProductStore, type IProduct } from '@/stores/product'
import Slider from '@vueform/slider'
import Products from '@/components/Products.vue'
import Card from '@/components/Card.vue'

const productStore = useProductStore()
const filteredProducts = ref<IProduct[]>([])
const priceRange = ref([100, 700])

async function handleFitlerByCategory(event: Event) {
  const li = event.target as HTMLUListElement
  if (event.currentTarget === event.target) return
  filteredProducts.value = await productStore.fetchProductsByCategory(li.textContent)
  productStore.loading = false
}

onBeforeMount(() => {
  !productStore.categories.length && productStore.getCategories()
  !productStore.products.length && productStore.getProducts()
})

watch(priceRange, ([min, max]) => {
  filteredProducts.value = productStore.products.filter(({ price }) => price >= min && price <= max)
})
</script>

<template>
  <div class="space-y-6">
    <Card>
      <template #header>Categories</template>
      <template #content>
        <ul class="space-y-0.5 font-semibold text-zinc-500" @click="handleFitlerByCategory">
          <RouterLink to="/products">
            <li v-for="category in productStore.categories" :key="category" class="cursor-pointer">
              {{ category }}
            </li>
          </RouterLink>
        </ul>
      </template>
    </Card>
    <Card>
      <template #header>Shop By Price</template>
      <template #content>
        <div class="mb-6 flex justify-between">
          <div class="flex flex-col items-center">
            <span class="text-[10px] text-zinc-500">Minimun Price</span>
            <span class="mt-0.5 bg-slate-200 px-2 font-bold">{{ priceRange[0].toFixed(2) }}</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[10px] text-zinc-500">Maximun Price</span>
            <span class="mt-0.5 bg-slate-200 px-2 font-bold">{{ priceRange[1].toFixed(2) }}</span>
          </div>
        </div>
        <Slider v-model="priceRange" class="slider-blue" :tooltips="false" :min="0" :max="1000" />
      </template>
    </Card>
  </div>
  <Products :products="filteredProducts" />
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
.slider-blue {
  --slider-connect-bg: #3b82f6;
  --slider-tooltip-bg: #3b82f6;
  --slider-handle-ring-color: #3b82f630;
}
</style>
