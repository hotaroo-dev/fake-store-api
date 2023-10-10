<script setup lang="ts">
import gsap from 'gsap'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function onBeforeEnter(el: Element, height = 0) {
  ;(el as HTMLElement).style.opacity = '0'
  ;(el as HTMLElement).style.height = `${height}px`
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    height: 'auto',
    onComplete: done
  })
}

function onLeave(el: Element, done: () => void, height = 0) {
  gsap.to(el, {
    opacity: 0,
    height,
    onComplete: done
  })
}
</script>

<template>
  <Transition name="slide-fade">
    <div
      v-if="cartStore.isCartOpen"
      class="container pointer-events-none fixed top-16 flex h-min justify-end xl:top-24"
    >
      <div
        class="pointer-events-auto mr-8 w-full max-w-[22rem] rounded border border-zinc-200 bg-white"
      >
        <div class="p-4">
          <h1 class="font-bold">Your Cart</h1>
        </div>

        <Transition
          @before-enter="(el) => onBeforeEnter(el, 41)"
          @enter="onEnter"
          @leave="(el, done) => onLeave(el, done, 41)"
          mode="out-in"
        >
          <div v-if="cartStore.cart.length === 0" class="border-b border-zinc-200 pb-4 pl-4">
            <p>Your Cart is empty</p>
          </div>
          <TransitionGroup
            v-else
            class="border-t border-zinc-200"
            tag="div"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <div v-for="cartItem in cartStore.cart" :key="cartItem.product.id">
              <div class="flex justify-between border-b border-zinc-200 p-4">
                <p class="w-9/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {{ cartItem.product.title }}
                </p>
                <p
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm leading-snug text-white"
                >
                  {{ cartItem.count }}
                </p>
              </div>
            </div>
          </TransitionGroup>
        </Transition>

        <div class="flex flex-col gap-4 py-4">
          <div class="flex justify-between border-b px-4 pb-4">
            <span>Price</span>
            <span class="font-bold">${{ cartStore.totalPrice }}</span>
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
  transform: translateY(-10px);
}
</style>
