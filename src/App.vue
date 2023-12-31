<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from './stores/product'
import ProductCart from '@/components/ProductCart.vue'
import CartIcon from '@/components/icons/CartIcon.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const router = useRouter()

router.beforeEach(() => {
  cartStore.isCartOpen = false
})
</script>

<template>
  <header class="sticky top-0 z-10 bg-stone-900 py-4 text-white">
    <div class="container flex items-center justify-between">
      <nav>
        <ul class="flex items-center gap-8">
          <li>
            <RouterLink to="/"><span class="font-bold">The Identity Store</span></RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{
                path: `/products`,
                query: {
                  ...$route.query,
                  min: productStore.priceRange[0],
                  max: productStore.priceRange[1],
                  page: 1
                }
              }"
              ><span class="text-sm">Products</span></RouterLink
            >
          </li>
        </ul>
      </nav>
      <button class="relative text-2xl" @click="cartStore.toggleCartVisibility">
        <CartIcon />
        <Transition name="fade">
          <span
            v-if="cartStore.totalItemsCount"
            class="absolute top-1/2 h-4 w-4 rounded-full bg-red-400 text-xs leading-tight"
            >{{ cartStore.totalItemsCount }}</span
          >
        </Transition>
      </button>
    </div>
  </header>
  <main class="container grid grid-cols-1 gap-10 py-10 md:grid-cols-3 xl:grid-cols-4">
    <RouterView :key="$route.fullPath" />
    <ProductCart />
  </main>
</template>

<style>
.btn {
  @apply h-10 rounded bg-blue-500 px-4 text-white active:animate-button-pop;
}
.btn.decrease {
  @apply bg-yellow-500;
}
.btn.remove {
  @apply bg-red-500 text-white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
