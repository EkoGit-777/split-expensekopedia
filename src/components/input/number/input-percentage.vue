<script setup lang="ts">
import { computed } from 'vue'
import InputNumber from '@/components/input/number/index.vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <div class="relative flex items-center">
    <input-number v-model="value" class="form-input !pr-10" />
    <div class="absolute right-2 text-gray-400">%</div>
  </div>
</template>

<style lang="postcss" scoped>
</style>