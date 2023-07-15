<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  message?: Array<string>,
}>()
const text = computed(() => {
  if (Array.isArray(props.message) && props.message.length) {
    return props.message[0]
  }

  return null
})
</script>
<template>
  <div v-if="text" class="py-1 text-xs text-red-500">
    {{ text }}
  </div>
</template>