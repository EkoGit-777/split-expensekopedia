import { defineStore } from 'pinia'

export const useCurrencySymbolStore = defineStore('currency-symbol', {
  state: () => {
    return {
      symbol: <string>localStorage.currency_symbol ?? 'Rp',
      availableSymbols: ['Rp', '$', '£', '€', '¥'],
      // '₹'
    }
  },
  actions: {
    change (newVal: string) {
      this.symbol = newVal
      localStorage.currency_symbol = newVal
    },
  },
})