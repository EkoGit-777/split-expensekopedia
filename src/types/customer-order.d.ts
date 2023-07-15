import { CustomerType } from './customer.d'
import { OrderItemType } from './order-item.d'

export interface CustomerOrderType {
  id: number,
  customer_id: number,
  order_id: number,
  paid: boolean,
  items: OrderItemType[],
  customer: CustomerType,
}