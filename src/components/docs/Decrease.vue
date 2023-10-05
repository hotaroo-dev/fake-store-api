<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

defineProps<{ disabled: boolean }>()

const { decrement } = useCounterStore()
</script>

<template>
  <button @click="decrement" :disabled="disabled" class="disabled:text-gray-400">decrement</button>
</template>
