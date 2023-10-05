<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '@/stores/counter'
import Decrease from './Decrease.vue'
import Increase from './Increase.vue'

const store = useCounterStore()
const disabled = computed(() => store.count === 0)
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <p id="count">{{ store.count }}</p>
    <div class="flex gap-4">
      <Decrease :disabled="disabled" />
      <Increase />
    </div>
  </div>
</template>
