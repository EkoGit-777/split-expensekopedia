interface OrderFullType {
  id: number,
  created_by: number,
  number: string,
  restaurant_name: string,
  customer_orders: CustomerOrderType[],
  discounts: OrderDiscountType[],
  costs: OrderCostType[],
}