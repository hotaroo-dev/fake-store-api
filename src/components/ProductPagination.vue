<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore, type IProduct } from '@/stores/product'
import ProductCard from './ProductCard.vue'
import SpinnerIcon from './icons/SpinnerIcon.vue'
import ArrowLeftIcon from './icons/ArrowLeftIcon.vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'

const props = defineProps<{ products: IProduct[]; loading: boolean }>()

const offset = 6
const productStore = useProductStore()
const filterdProducts = ref<IProduct[]>()
const route = useRoute()
const pages = ref()
const currentPage = +(route.query.page || 1)
const startIdx = offset * (currentPage - 1)

function filterByPrice(product: IProduct[], priceRange: number[]) {
  return product.filter(({ price }) => price >= priceRange[0] && price <= priceRange[1])
}

watch(
  [() => props.products, () => productStore.priceRange],
  ([products, priceRange]) => {
    filterdProducts.value = filterByPrice(products, priceRange)
    pages.value = Math.ceil(filterdProducts.value.length / offset)
  },
  { immediate: true }
)
</script>

<template>
  <div class="col-span-1 md:col-span-3">
    <div v-if="loading" class="mt-20 flex justify-center text-blue-500">
      <SpinnerIcon />
    </div>
    <template v-else>
      <div
        v-if="filterdProducts?.length"
        class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="product in filterdProducts.slice(startIdx, startIdx + offset)"
          :key="product.id"
        >
          <ProductCard :product="product" />
        </div>
      </div>
      <div v-if="pages > 1" class="mt-6 flex items-center gap-10">
        <button
          :disabled="currentPage === 1"
          class="disabled:text-zinc-400"
          @click="$router.push(`${route.path}?page=${currentPage - 1}`)"
        >
          <ArrowLeftIcon class="text-2xl" />
        </button>
        <div class="flex flex-1 justify-center gap-4">
          <RouterLink
            :to="`${route.path}?page=${page}`"
            v-for="page in pages"
            :key="page"
            class="flex h-10 items-center justify-center rounded px-4 font-bold text-blue-800"
            :class="{ 'bg-blue-100': page === currentPage }"
          >
            <span>{{ page }}</span>
          </RouterLink>
        </div>
        <button
          :disabled="currentPage === pages"
          class="disabled:text-zinc-400"
          @click="$router.push(`${route.path}?page=${currentPage + 1}`)"
        >
          <ArrowRightIcon class="text-2xl" />
        </button>
      </div>
    </template>
  </div>
</template>
