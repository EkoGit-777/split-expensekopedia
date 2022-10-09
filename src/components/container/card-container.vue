<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="rounded">
    <div class="bg-3 px-4 py-2 text-lg rounded-t">{{title}}</div>
    <div class="bg-2 p-4 space-y-4 rounded-b">
      <slot></slot>
    </div>
  </div>
</template>