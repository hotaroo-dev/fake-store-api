<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const { increment } = useCounterStore()
</script>

<template>
  <button @click="increment">increment</button>
</template>
