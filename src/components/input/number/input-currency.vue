<script setup lang="ts">
import { computed } from 'vue'
import InputNumber from '@/components/input/number/index-component.vue'
import { useCurrencySymbolStore } from '@/stores/currency-symbol'

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

const currencySymbol = useCurrencySymbolStore()
</script>

<template>
  <div class="relative flex items-center">
    <input-number :id="id" v-model="value" class="form-input !pl-9" />
    <div class="absolute left-2 text-gray-400 w-5 text-center">
      {{ currencySymbol.symbol }}
    </div>
  </div>
</template>