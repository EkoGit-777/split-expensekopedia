<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCurrencySymbolStore } from '@/stores/currency-symbol'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const themes = ['dark', 'light', 'system']
const selectedTheme = computed({
  get: () => theme.style,
  set: newVal => {
    theme.change(newVal)
  },
})

const currencySymbol = useCurrencySymbolStore()
const symbol = ref(currencySymbol.symbol)
watch(symbol, (newVal) => {
  currencySymbol.change(newVal)
})
</script>

<template>
  <div class="bg-2 mx-auto p-4 container">
    <div class="mb-4">
      <label for="theme">Theme</label>
      <select id="theme" v-model="selectedTheme" class="form-input w-24">
        <option v-for="t in themes" :key="t" :value="t">
          {{ t }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label for="currency-symbol">Currency Symbol</label>
      <div class="flex items-baseline gap-4">
        <input
          id="currency-symbol"
          v-model="symbol"
          type="text"
          maxlength="3"
          class="form-input w-12 text-center">

        <div class="flex gap-2">
          <button
            v-for="(s, index) in currencySymbol.availableSymbols"
            :key="index"
            class="bg-3 block aspect-square h-7 border text-sm dark:border-gray-600"
            @click="symbol = s">
            {{ s }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
</style>