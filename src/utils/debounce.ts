export default function debounce(fn: () => void, delay: number) {
  let timer: any = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}
