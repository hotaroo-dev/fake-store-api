<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'

const cartStore = useCartStore()
</script>

<template>
  <div class="col-span-3">
    <div v-if="cartStore.cart.length" class="grid gap-8">
      <div
        v-for="cartItem in cartStore.cart"
        :key="cartItem.product.id"
        class="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-3"
      >
        <ProductCard :product="cartItem.product" :allow-quantity-change="false" />
        <div class="flex flex-row justify-between gap-4 lg:flex-col lg:items-start">
          <div class="flex items-center gap-4">
            <Button size="small" label="+" @click="cartStore.addToCart(cartItem.product)" />
            <span>{{ cartItem.count }}</span>
            <Button
              size="small"
              label="-"
              severity="warning"
              @click="cartStore.decreaseItemQuantity(cartItem.product.id)"
            />
          </div>
          <Button
            size="small"
            label="Remove Item"
            severity="danger"
            @click="cartStore.deleteCartItem(cartItem.product.id)"
          />
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="font-semibold">No cart</p>
    </div>
  </div>
</template>
