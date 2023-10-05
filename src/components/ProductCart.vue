<script setup lang="ts">
import gsap from 'gsap'
import { useCartStore } from '@/stores/cart'

defineProps<{ isCartOpen: boolean }>()

const store = useCartStore()

function onBeforeEnter(el: Element) {
  ;(el as HTMLElement).style.opacity = '0'
  ;(el as HTMLElement).style.height = '0'
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    height: 'auto',
    onComplete: done
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    onComplete: done
  })
}
</script>

<template>
  <Transition name="slide-fade">
    <div
      v-if="isCartOpen"
      class="fixed left-3 right-3 top-16 h-min rounded border border-zinc-200 bg-white md:left-[60%] md:right-10 xl:sticky xl:top-24"
    >
      <div class="border-b border-zinc-200 p-4">
        <h1 class="mb-4 font-bold">Your Cart</h1>
        <div v-if="store.carts.length === 0">
          <p>Your Cart is empty</p>
        </div>
      </div>

      <div v-if="store.carts.length">
        <TransitionGroup tag="div" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
          <div v-for="cart in store.carts" :key="cart.product.id">
            <div class="flex justify-between border-b border-zinc-200 p-4">
              <p class="w-9/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {{ cart.product.title }}
              </p>
              <p
                class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm leading-snug text-white"
              >
                {{ cart.count }}
              </p>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div class="flex flex-col gap-4 py-4">
        <div class="flex justify-between border-b px-4 pb-4">
          <span>Price</span>
          <span class="font-bold">${{ store.total }}</span>
        </div>
        <div class="flex-1 px-4">
          <RouterLink
            class="block w-full rounded bg-blue-500 py-2 text-center text-white active:translate-y-0.5"
            to="/shop"
          >
            Checkout
          </RouterLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  scale: 0.99;
  transform: translateY(-10px);
  transform-origin: top center;
}
</style>