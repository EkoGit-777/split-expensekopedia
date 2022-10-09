<script setup lang="ts">
import OrderSummary from './order-summary.vue'
import OrderDiscount from './order-discount.vue'
import OrderCost from './order-cost.vue'
import OrderForm from './order-form.vue'
import OrderList from './order-list.vue'
</script>

<template>
  <div class="flex p-4 h-full">
    <div class="w-96 flex-none">
      <OrderList />
    </div>
    <div class="mx-auto px-8 max-w-2xl w-full h-full">
      <OrderForm />
    </div>
    <div class="w-72 flex flex-col flex-none space-y-4 overflow-auto">
      <OrderCost />
      <OrderDiscount />
      <OrderSummary />
    </div>
  </div>
</template>