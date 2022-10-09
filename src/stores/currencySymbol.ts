import { defineStore } from 'pinia'
export const useCurrencySymbolStore = defineStore('currency-symbol', {
  state: () => {
    return {
      symbol: localStorage.currency_symbol ?? 'Rp',
      availableSymbols: ['Rp', '$', '£', '€', '¥'],
      // '₹'
    }
  },
  actions: {
    change (newVal) {
      this.symbol = newVal
      localStorage.currency_symbol = newVal
    },
  },
})