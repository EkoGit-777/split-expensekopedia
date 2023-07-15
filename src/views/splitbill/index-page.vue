<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderModel } from '@/models/order'
import { useAuthStore } from '@/stores/auth'
import { useTutorialStore } from '@/stores/tutorial'
import OrderCost from './cost/index-component.vue'
import CustomerList from './customer/index-component.vue'
import OrderDiscount from './discount/index-component.vue'
import OrderInformation from './information-component.vue'
import OrderItem from './item/index-component.vue'
import OrderSummary from './summary-component.vue'
import TutorialPage from './tutorial/index-component.vue'

const route = useRoute()
const auth = useAuthStore()
const page = useTutorialStore()
const { viewData } = useOrderModel()

onMounted(() => {
  if (!isNaN(Number(route.params.order_id))) {
    viewData(Number(route.params.order_id))
  }
})
</script>

<template>
  <div class="relative h-full">
    <div class="flex p-4 h-full">
      <div class="w-96 flex-none">
        <customer-list />
      </div>
      <div class="mx-auto px-8 max-w-2xl w-full h-full">
        <order-item />
      </div>
      <div class="w-72 flex flex-col flex-none space-y-4 overflow-auto">
        <template v-if="auth.user.id">
          <order-information />
        </template>
        <order-cost />
        <order-discount />
        <order-summary />
      </div>
    </div>
    <template v-if="page.showHelp">
      <tutorial-page />
    </template>
  </div>
</template>