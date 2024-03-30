<script setup lang="ts">
import { computed } from 'vue'
import InputText from '@/components/input/text/index-component.vue'

const props = defineProps<{
  id?: string,
  modelValue: string,
  prefix?: boolean,
  suffix?: boolean,
  autocomplete?: string,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: string): void,
}>()
const value = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="relative flex items-center">
    <template v-if="prefix">
      <div class="absolute left-2 w-8 text-center text-gray-400">
        <slot name="prefix"></slot>
      </div>
    </template>
    <input-text
      :id="id"
      v-model="value"
      :autocomplete="autocomplete"
      class="form-input"
      :class="{ '!pl-12': prefix, ' !pr-12': suffix }" />
    <template v-if="suffix">
      <div class="absolute right-2 w-8 text-center text-gray-400">
        <slot name="suffix"></slot>
      </div>
    </template>
  </div>
</template>