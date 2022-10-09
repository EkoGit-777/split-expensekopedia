<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCurrencySymbolStore } from '@/stores/currencySymbol'
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
  <div class="container mx-auto bg-2 p-4">
    <div class="mb-4">
      <label for="theme">Theme</label>
      <select v-model="selectedTheme" class="form-input w-24">
        <option v-for="t in themes" :key="t" :value="t">
          {{ t }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label for="currency">Currency Symbol</label>
      <div class="flex gap-4 items-baseline">
        <input
          v-model="symbol"
          type="text"
          maxlength="3"
          class="w-12 form-input text-center">

        <div class="flex gap-2">
          <button
            v-for="(s, index) in currencySymbol.availableSymbols"
            :key="index"
            class="h-7 block border bg-3 dark:border-gray-600 aspect-square text-sm"
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