<script setup lang="ts">
defineProps<{
  title?: string,
}>()
</script>

<template>
  <div class="rounded">
    <div class="bg-3 rounded-t px-4 py-2 text-lg">
      {{ title }}
    </div>
    <div class="bg-2 rounded-b p-4 space-y-4">
      <slot></slot>
    </div>
  </div>
</template>