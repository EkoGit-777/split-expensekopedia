<script setup lang="ts">
import Cleave from 'cleave.js'
import { computed, nextTick, onMounted, ref } from 'vue'

interface Props {
  id?: string,
  modelValue?: string | number,
  max?: number,
  min?: number,
}
const props = withDefaults(defineProps<Props>(), {
  id: '',
  modelValue: '',
  max: Number.MAX_VALUE,
  min: 0,
})
const emit = defineEmits<{
  (e: 'update:modelValue', data: string | number): void,
}>()

const inputCleave = ref()
const cleave = ref()

const textInput = computed({
  set: val => {
    const result = Number(cleave.value?.getRawValue() ?? val)
    // console.log('input number changed:', cleave.value?.getRawValue())
    if (result > props.max) {
      emit('update:modelValue', result + 1)
      nextTick(() => {
        emit('update:modelValue', props.max)
      })
    } else if (result < props.min) {
      emit('update:modelValue', result - 1)
      nextTick(() => {
        emit('update:modelValue', props.min)
      })
    } else if (result) {
      emit('update:modelValue', result)
    } else {
      emit('update:modelValue', 1)
      nextTick(() => {
        emit('update:modelValue', 0)
      })
    }
  },
  get: () => {
    // TODO app input number should follow separator set in money.js
    return String(props.modelValue)
      .replace('.', '/')
      .replace(',', '.')
      .replace('/', ',')
  },
})

onMounted(() => {
  cleave.value = new Cleave(inputCleave.value, {
    numeral: true,
    numeralDecimalMark: ',',
    delimiter: '.',
  })
})
</script>

<template>
  <input
    :id="id"
    ref="inputCleave"
    v-model="textInput"
    inputmode="numeric">
</template>