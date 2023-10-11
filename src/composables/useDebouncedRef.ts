import { computed, isRef, ref, type UnwrapRef, type WritableComputedRef } from 'vue'

export function useDebouncedRef<T>(value: T, delay = 200): WritableComputedRef<UnwrapRef<T>> {
  const rawValue = (isRef(value) ? value.value : value) as T
  const rawValueRef = ref(rawValue)
  let timer: any = null

  return computed({
    get: () => rawValueRef.value,
    set: (value) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        rawValueRef.value = value
      }, delay)
    }
  })
}
