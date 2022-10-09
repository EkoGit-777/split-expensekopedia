import { defineStore } from 'pinia'
import { idr } from '@/helpers/money'
import currency from 'currency.js'
// import { idr, usd, jpy } from '@/helpers/money'
// import { useCurrencySymbolStore } from '@/stores/currencySymbol'

export type Item = {
  name: string,
  price: number | currency,
  paid: boolean,
}
export type People = {
  name: string,
  showBill: boolean,
  items: Item[]
}
export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      people: [] as People[],
      selectedPerson: null,
      costs: [], // {title: string, nominal: number}
      discounts: [{
        percent: 0,
        cash: 0,
      }],
    }
  },
  getters: {
    currency () {
      // TODO app input number should follow separator set in money.js
      // const currencySymbol = useCurrencySymbolStore()
      // switch (currencySymbol.availableSymbols.indexOf(currencySymbol.symbol)) {
      // case 0: return idr; break
      // case 4: return jpy; break
      // default: return usd; break
      // }
      return idr
    },
    subtotal () {
      const subtotal = this.people.reduce((carryOrder, person) => {
        const totalItem = person.items.reduce((carry, item) => {
          return this.currency(item.price).add(carry)
        }, 0)
        return this.currency(totalItem).add(carryOrder)
      }, 0)
      return this.currency(subtotal)
    },
    personSubtotal: (state) => (index) => {
      const subtotal = state.people[index].items.reduce((carry, item) => {
        return state.currency(item.price).add(carry)
      }, 0)
      return state.currency(subtotal)
    },
    personSplitBill: (state) => (index) => {
      const bill = state.subtotal > 0 ? state.personSubtotal(index).divide(state.subtotal).multiply(state.subtotalAfterCost) : 0
      return state.currency(bill)
    },
    peopleSplitBill () {
      const people
    },
    totalCost () {
      const total = this.costs.reduce((carry, item) => {
        return this.currency(item.nominal).add(carry)
      }, 0)
      return this.currency(total)
    },
    totalDiscount () {
      let subtotal = this.subtotal
      let subTotalDiscount = this.currency(0)
      this.discounts.forEach(discount => {
        subtotal = this.currency(subtotal).subtract(subTotalDiscount)
        let discountNominal = this.currency(0)

        if (discount.percent === 0) {
          discountNominal = this.currency(discount.cash)
        } else {
          discountNominal = this.currency(subtotal).multiply(discount.percent).divide(100)
        }

        subTotalDiscount = this.currency(subTotalDiscount).add(discountNominal)
      })

      return subTotalDiscount
    },
    subtotalAfterDiscount () {
      return this.subtotal.subtract(this.totalDiscount)
    },
    subtotalAfterCost () {
      return this.subtotalAfterDiscount.add(this.totalCost)
    },
  },
  actions: {
    peopleAdd ({ name }) {
      this.people.push({ name, showBill: false, items: [] })
      this.selectedPerson = this.people.length - 1
    },
    peopleEdit (index) {
      this.selectedPerson = index
    },
    peopleRemove (index) {
      if (this.selectedPerson == index) {
        this.selectedPerson = null
      }
      this.people.splice(index, 1)
    },
    peopleToggleShowBill (index) {
      this.people[index].showBill = !this.people[index].showBill
    },

    itemAdd ({ index, name, price, qty }) {
      for (let i = 0; i < qty; i++) {
        this.people[index].items.push({ name, price: this.currency(price), paid: false })
      }
    },
    itemEdit ({ index, name, price, indexItem }) {
      this.people[index].items[indexItem].name = name
      this.people[index].items[indexItem].price = price
    },
    itemRemove (index, indexItem) {
      this.people[index].items.splice(indexItem, 1)
    },
    itemTogglePaid (index, indexItem) {
      this.people[index].items[indexItem].paid = !this.people[index].items[indexItem].paid
    },
    itemClear (index) {
      this.people[index].items = []
    },

    discountAdd () {
      this.discounts.push({ percent: 0, cash: 0 })
    },
    discountRemove (index) {
      this.discounts.splice(index, 1)
    },

    costAdd (title) {
      this.costs.push({ title: title, nominal: 0 })
    },
    costRemove (index) {
      this.costs.splice(index, 1)
    },
  },
})