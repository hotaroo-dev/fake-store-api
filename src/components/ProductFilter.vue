<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { useProductStore } from '@/stores/product'
import Slider from '@vueform/slider'
import Card from '@/components/Card.vue'

const productStore = useProductStore()
const inputRef = ref<HTMLInputElement>()
const searchTerm = ref('')
const router = useRouter()
const route = useRoute()
const min = route.query.min ? +route.query.min : 0
const max = route.query.max ? +route.query.max : 1000
const search = route.query.search ? route.query.search.toString() : ''

onBeforeMount(() => {
  searchTerm.value = search
  productStore.priceRange = [min, max]
  !productStore.categories.length && productStore.getCategories()
})

onMounted(() => {
  inputRef.value?.focus()
})

watch(
  () => productStore.priceRange,
  ([min, max]) => {
    router.push({ query: { ...route.query, min, max } })
  }
)

watch(searchTerm, useDebounceFn(updateSearchQuery, 400))

function updateSearchQuery(newTerm: string) {
  router.push({ query: { ...route.query, search: newTerm } })
}
</script>

<template>
  <div class="top-24 h-min lg:sticky">
    <div class="flex w-full flex-col gap-6">
      <input
        ref="inputRef"
        v-model="searchTerm"
        placeholder="search..."
        type="text"
        class="mx-auto h-10 w-[calc(100%-8px)] rounded border border-zinc-200 px-4 shadow-sm outline outline-1 outline-offset-4 outline-zinc-200"
      />
      <Card>
        <template #header>Categories</template>
        <template #content>
          <ul v-if="productStore.categories.length" class="space-y-0.5 font-semibold text-zinc-500">
            <li
              v-for="category in productStore.categories"
              :key="category"
              class="cursor-pointer"
              :class="{ 'text-blue-500': category === $route.params.categoryName }"
            >
              <RouterLink
                :to="{ path: `/products/category/${category}`, query: { ...route.query, page: 1 } }"
              >
                {{ category }}
              </RouterLink>
            </li>
          </ul>
          <div v-else class="space-y-2">
            <div
              v-for="num in 4"
              :key="num"
              class="h-5 w-full animate-pulse rounded-sm bg-zinc-200"
            ></div>
          </div>
        </template>
      </Card>
      <Card>
        <template #header>Shop By Price</template>
        <template #content>
          <div class="mb-6 flex justify-between">
            <div class="flex flex-col items-center">
              <span class="text-[10px] font-bold text-zinc-500">Minimun Price</span>
              <span class="mt-0.5 bg-slate-200 px-2 font-bold">{{
                productStore.priceRange[0].toFixed(2)
              }}</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-[10px] font-bold text-zinc-500">Maximun Price</span>
              <span class="mt-0.5 bg-slate-200 px-2 font-bold">{{
                productStore.priceRange[1].toFixed(2)
              }}</span>
            </div>
          </div>
          <Slider
            v-model="productStore.priceRange"
            class="slider-blue"
            :tooltips="false"
            :min="0"
            :max="1000"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
.slider-blue {
  --slider-connect-bg: #3b82f6;
  --slider-tooltip-bg: #3b82f6;
  --slider-handle-ring-color: #3b82f630;
}
</style>
