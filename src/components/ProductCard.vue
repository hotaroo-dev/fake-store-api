<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { IProduct } from '@/stores/product'

withDefaults(defineProps<{ product: IProduct; allowQuantityChange?: boolean }>(), {
  allowQuantityChange: true
})

const { addToCart, decreaseItemQuantity } = useCartStore()
</script>

<template>
  <div class="rounded border border-zinc-200 shadow-sm">
    <RouterLink :to="`/products/${product.id}`">
      <img class="aspect-[3/2] w-full object-contain p-4" :src="product.image" />
    </RouterLink>
    <div class="flex flex-col gap-3 p-4">
      <h2 class="w-9/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {{ product.title }}
      </h2>
      <div>
        <p>${{ product.price }}</p>
        <p class="w-9/12 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {{ product.description }}
        </p>
      </div>
      <div class="flex gap-6">
        <Button
          size="small"
          label="Add to Cart"
          class="mr-auto flex-1"
          :class="{ 'max-w-[16rem]': !allowQuantityChange }"
          @click="addToCart(product)"
        />
        <template v-if="allowQuantityChange">
          <div class="flex gap-3">
            <Button size="small" label="+" @click="addToCart(product)" />
            <Button
              size="small"
              label="-"
              severity="warning"
              @click="decreaseItemQuantity(product.id)"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
