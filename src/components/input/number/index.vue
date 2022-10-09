<script setup lang="ts">
import Cleave from 'cleave.js'
import { computed, onMounted, nextTick, ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
    default: '',
  },
  max: {
    type: Number,
    default: Number.MAX_VALUE,
  },
  min: {
    type: Number,
    default: 0,
  },
})

const inputCleave = ref()
const cleave = ref(null)

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
    ref="inputCleave"
    v-model="textInput"
    inputmode="numeric">
</template>

<style lang="postcss" scoped>
</style>