import { CustomerOrderType } from './customer-order.d'
import { OrderCostType } from './order-cost.d'
import { OrderDiscountType } from './order-discount.d'

export interface OrderFullType {
  id: number,
  created_by: number,
  number: string,
  restaurant_name: string,
  customer_orders: CustomerOrderType[],
  discounts: OrderDiscountType[],
  costs: OrderCostType[],
}