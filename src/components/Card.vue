<template>
  <div class="rounded border bg-white p-6 shadow-sm">
    <h2 class="border-b border-zinc-200 pb-3 text-xl font-bold">
      <slot name="header" />
    </h2>
    <div class="mt-3">
      <slot name="content" />
    </div>
  </div>
</template>
