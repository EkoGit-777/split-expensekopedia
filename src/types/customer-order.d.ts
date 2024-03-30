interface CustomerOrderType {
  id: number,
  customer_id: number,
  order_id: number,
  paid: boolean,
  items: OrderItemType[],
  customer: CustomerType,
}