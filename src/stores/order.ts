import currency from 'currency.js'
import { defineStore } from 'pinia'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { idr } from '@/helpers/money'
import { useCustomerOrderModel } from '@/models/customer-order'
import { useOrderModel } from '@/models/order'
import { useOrderCostModel } from '@/models/order-cost'
import { useOrderDiscountModel } from '@/models/order-discount'
import { useOrderItemModel } from '@/models/order-item'
import { useAuthStore } from '@/stores/auth'
// import { idr, usd, jpy } from '@/helpers/money'
// import { useCurrencySymbolStore } from '@/stores/currencySymbol'

interface State {
  route: RouteLocationNormalizedLoaded,
  orderNumber: string,
  restaurantName: string,
  people: People[],
  selectedPerson: number|null,
  costs: Cost[],
  discounts: Discount[],
}
export const useOrderStore = defineStore('order', {
  state: (): State => {
    return {
      route: useRoute(),
      orderNumber: '',
      restaurantName: '',
      people: [],
      selectedPerson: null,
      costs: [],
      discounts: [],
    }
  },
  getters: {
    loginState (): number|null {
      const authStore = useAuthStore()
      return authStore.user.id
    },
    currency (): (value: currency) => currency {
      // TODO app input number should follow separator set in money.js
      // const currencySymbol = useCurrencySymbolStore()
      // switch (currencySymbol.availableSymbols.indexOf(currencySymbol.symbol)) {
      // case 0: return idr; break
      // case 4: return jpy; break
      // default: return usd; break
      // }
      return idr
    },
    subtotal (): currency {
      const subtotal = this.people.reduce((carryOrder, person): number => {
        const totalItem = person.items.reduce((carry, item): number => {
          return this.currency(currency(item.price)).add(carry).intValue
        }, 0)
        return this.currency(currency(totalItem)).add(carryOrder).intValue
      }, 0)
      return this.currency(currency(subtotal))
    },
    totalCost (): currency {
      const total = this.costs.reduce((carry, item): number => {
        return this.currency(currency(item.nominal)).add(carry).intValue
      }, 0)
      return this.currency(currency(total))
    },
    totalDiscount (): currency {
      let subtotal = this.subtotal
      let subTotalDiscount = this.currency(currency(0))
      this.discounts.forEach(discount => {
        subtotal = this.currency(subtotal).subtract(subTotalDiscount)
        let discountNominal = this.currency(currency(0))

        if (discount.percent === 0) {
          discountNominal = this.currency(currency(discount.cash))
        } else {
          discountNominal = this.currency(subtotal).multiply(discount.percent).divide(100)
        }

        subTotalDiscount = this.currency(subTotalDiscount).add(discountNominal)
      })

      return subTotalDiscount
    },
    subtotalAfterDiscount (): currency {
      return this.subtotal.subtract(this.totalDiscount)
    },
    subtotalAfterCost (): currency {
      return this.subtotalAfterDiscount.add(this.totalCost)
    },
  },
  actions: {
    initOrder (order: OrderFullType) {
      this.restaurantName = order.restaurant_name
      this.orderNumber = order.number
      this.people = order.customer_orders.map(customerOrder => {
        return {
          id: customerOrder.id,
          customerId: customerOrder.customer.id,
          name: customerOrder.customer.name,
          paid: customerOrder.paid,
          showBill: false,
          items: customerOrder.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
            }
          }),
        }
      })
      this.costs = order.costs.map(cost => {
        return {
          id: cost.id,
          title: cost.name,
          nominal: cost.cost,
        }
      })
      this.discounts = order.discounts.map(discount => {
        return {
          id: discount.id,
          percent: discount.percentage,
          cash: discount.nominal,
        }
      })
    },
    async orderAdd ({ number, name }: { number: string, name: string}): Promise<null | OrderType> {
      const { form, postData } = useOrderModel()
      this.orderNumber = number
      this.restaurantName = name
      form.number = number
      form.restaurant_name = name
      const response = await postData()
      return response
    },
    async peopleAdd ({ id, name }: {id: number|null, name: string}) {
      let response
      if (id) {
        const { form, postData } = useCustomerOrderModel()
        form.customer_id = id
        form.order_id = Number(this.route.params.order_id)
        response = await postData()
      }
      this.people.push({ id: response?.id ?? null, customerId: id, name, paid: false, showBill: false, items: [] })
      this.selectedPerson = this.people.length - 1
    },
    async peopleRename (id: number|null, name: string) {
      if (id) {
        const { form, putData } = useCustomerOrderModel()
        form.customer_id = id
        await putData(Number(this.people[Number(this.selectedPerson)].id))
        this.people[Number(this.selectedPerson)].customerId = id
      }
      this.people[Number(this.selectedPerson)].name = name
    },
    peopleEdit (index: number) {
      this.selectedPerson = index
    },
    peopleRemove (index: number) {
      if (this.selectedPerson == index) {
        this.selectedPerson = null
      }
      this.people.splice(index, 1)
    },
    peopleToggleShowBill (index: number) {
      this.people[index].showBill = !this.people[index].showBill
    },
    personSubtotal (index: number): currency {
      const subtotal = this.people[index].items.reduce((carry, item): number => {
        return this.currency(currency(item.price)).add(carry).intValue
      }, 0)
      return this.currency(currency(subtotal))
    },
    personSplitBill (index: number): currency {
      const bill = this.subtotal.intValue > 0 ? this.personSubtotal(index).multiply(this.subtotalAfterCost).divide(this.subtotal) : 0
      return this.currency(currency(bill))
    },
    personDiscount (index: number): currency {
      const discount = this.subtotal.intValue > 0 ? this.personSubtotal(index).multiply(this.totalDiscount).divide(this.subtotal) : 0
      return this.currency(currency(discount))
    },
    personCost (index: number): currency {
      const bill = this.subtotal.intValue > 0 ? this.personSubtotal(index).multiply(this.totalCost).divide(this.subtotal) : 0
      return this.currency(currency(bill))
    },

    // item action
    async itemAdd ({ index, name, price, qty }: {index: number, name: string, price: number, qty: number}) {
      for (let i = 0; i < qty; i++) {
        let id = null
        if (this.loginState) {
          const { form, postData } = useOrderItemModel()
          form.customer_order_id = this.people[index].id
          form.name = name
          form.price = price
          const item = await postData()
          id = item?.id ?? null
        }
        this.people[index].items.push({
          id: id,
          name,
          price: this.currency(currency(price)),
        })
      }
    },
    async itemEdit ({ name, price, indexItem }: {name: string, price: number, indexItem: number}) {
      if (this.loginState) {
        const { form, putData } = useOrderItemModel()
        form.name = name
        form.price = price
        await putData(Number(this.people[Number(this.selectedPerson)].items[indexItem].id))
      }
      this.people[Number(this.selectedPerson)].items[indexItem].name = name
      this.people[Number(this.selectedPerson)].items[indexItem].price = price
    },
    async itemRemove (indexItem: number) {
      if (this.loginState) {
        const { deleteData } = useOrderItemModel()
        await deleteData(Number(this.people[Number(this.selectedPerson)].items[indexItem].id))
      }
      this.people[Number(this.selectedPerson)].items.splice(indexItem, 1)
    },
    async itemClear () {
      if (this.loginState) {
        const { clearItem } = useCustomerOrderModel()
        await clearItem(Number(this.people[Number(this.selectedPerson)].id))
      }
      this.people[Number(this.selectedPerson)].items = []
    },

    // discount action
    async discountAdd ({ percent, cash }: Discount) {
      let id = null
      if (this.loginState) {
        const { form, postData } = useOrderDiscountModel()
        form.order_id = Number(this.route.params.order_id)
        form.percentage = percent
        form.nominal = cash
        const discount = await postData()
        id = discount?.id ?? null
      }
      this.discounts.push({ id: id, percent, cash })
    },
    async discountEdit ({ percent, cash }: Discount, index: number) {
      if (this.loginState) {
        const { form, putData } = useOrderDiscountModel()
        form.percentage = percent
        form.nominal = cash
        await putData(Number(this.discounts[index].id))
      }
      this.discounts[index].percent = percent
      this.discounts[index].cash = cash
    },
    async discountRemove (index: number) {
      if (this.loginState) {
        const { deleteData } = useOrderDiscountModel()
        await deleteData(Number(this.discounts[index].id))
      }
      this.discounts.splice(index, 1)
    },

    // cost saction
    async costAdd ({ title, nominal }: Cost) {
      let id = null
      if (this.loginState) {
        const { form, postData } = useOrderCostModel()
        form.order_id = Number(this.route.params.order_id)
        form.name = title
        form.cost = nominal
        const cost = await postData()
        id = cost?.id ?? null
      }
      this.costs.push({ id: id, title, nominal })
    },
    async costEdit ({ title, nominal }: Cost, index: number) {
      if (this.loginState) {
        const { form, putData } = useOrderCostModel()
        form.name = title
        form.cost = nominal
        await putData(Number(this.costs[index].id))
      }
      this.costs[index].title = title
      this.costs[index].nominal = nominal
    },
    async costRemove (index: number) {
      if (this.loginState) {
        const { deleteData } = useOrderCostModel()
        await deleteData(Number(this.costs[index].id))
      }
      this.costs.splice(index, 1)
    },

    resetStore () {
      this.orderNumber = ''
      this.restaurantName = ''
      this.people = []
      this.selectedPerson = null
      this.costs = []
      this.discounts = []
    },
  },
})