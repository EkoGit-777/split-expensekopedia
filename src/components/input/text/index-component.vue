<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string,
  autocomplete?: string,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: string): void,
}>()
const inputText = computed({
  get: () => props.modelValue ?? '',
  set: (newValue: string) => emit('update:modelValue', newValue),
})
</script>

<template>
  <input
    v-model="inputText"
    class="form-input"
    inputmode="text"
    :autocomplete="autocomplete">
</template>