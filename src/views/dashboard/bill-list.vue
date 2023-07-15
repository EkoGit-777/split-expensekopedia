<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderModel } from '@/models/order'
import { OrderType } from '@/types/order'
import ModalAddBillComponent from './modal-add-bill-component.vue'

const router = useRouter()
const { getData: getOrder } = useOrderModel()
const modalAddBill = ref()

const addCustomer = () => {
  modalAddBill.value.open()
}
const redirect = (order: OrderType) => {
  router.replace({ name: 'billEdit', params: { order_id: order.id } })
}

onMounted(async () => {
  getOrder()
})
</script>

<template>
  <div class="space-y-4 flex flex-col h-full">
    <button class="bg-3 w-fit rounded-md text-sm p-2" title="Tambah Customer" @click="addCustomer">
      + Tagihan
    </button>
    <div class="flex flex-col h-full overflow-auto space-y-4">
      <div class="flex h-full items-center justify-center bg-2">
        Belum ada tagihan
      </div>
    </div>
  </div>
  <modal-add-bill-component ref="modalAddBill" @created="redirect" />
</template>