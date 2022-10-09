<script setup lang="ts">
import { computed } from 'vue'
import InputNumber from '@/components/input/number/index.vue'
import { useCurrencySymbolStore } from '@/stores/currencySymbol'

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

const currencySymbol = useCurrencySymbolStore()
</script>

<template>
  <div class="relative flex items-center">
    <input-number v-model="value" class="form-input !pl-9" />
    <div class="absolute left-2 text-gray-400 w-5 text-center">
      {{ currencySymbol.symbol }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
</style>