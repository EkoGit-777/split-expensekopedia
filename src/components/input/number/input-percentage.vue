<script setup lang="ts">
import { computed } from 'vue'
import InputNumber from '@/components/input/number/index-component.vue'

const props = defineProps<{
  id?: string,
  modelValue: number,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: number): void,
}>()
const value = computed({
  get: () => props.modelValue ?? '',
  set: (value: number) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="relative flex items-center">
    <input-number :id="id" v-model="value" class="form-input !pr-10" />
    <div class="absolute right-2 text-gray-400">
      %
    </div>
  </div>
</template>