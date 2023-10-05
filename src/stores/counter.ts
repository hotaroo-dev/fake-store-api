import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }

  watch(count, (newCount) => {
    if (newCount === 10) {
      alert('You have reached the maximum number')
      count.value = 0
    }
  })

  return { count, increment, decrement }
})
