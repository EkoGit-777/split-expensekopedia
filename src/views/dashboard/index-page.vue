<script setup lang="ts">
import BillCustomer from './bill-customer.vue'
import BillDetail from './bill-detail.vue'
import BillList from './bill-list.vue'
</script>
<template>
  <div class="flex p-4 h-full">
    <div class="w-96 flex-none">
      <bill-list />
    </div>
    <div class="w-96 flex-none">
      <bill-detail />
    </div>
    <div class="w-96 flex-none">
      <bill-customer />
    </div>
  </div>
</template>