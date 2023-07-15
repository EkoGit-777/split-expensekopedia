<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number|null,
  list: {
    id: number|null,
    name: string,
    disabled: boolean,
  }[],
  disabledValue?: number|null,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: number|null): void,
}>()
const selectedValue = computed({
  set (newValue) {
    emit('update:modelValue', newValue ? Number(newValue) : null)
  },
  get () {
    return props.modelValue
  },
})
</script>
<template>
  <select v-model="selectedValue">
    <template v-for="item in list" :key="item.id">
      <option :value="null" hidden>
        Pilih salah satu
      </option>
      <option :disabled="item.disabled ? item.disabled : disabledValue==item.id" :value="item.id">
        {{ item.name }}
      </option>
    </template>
  </select>
</template>