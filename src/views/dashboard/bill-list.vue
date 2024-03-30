<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderModel } from '@/models/order'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import ModalAddBillComponent from './modal-add-bill-component.vue'

const router = useRouter()
const { order, orders, getData: getOrder } = useOrderModel()
const modalAddBill = ref<InstanceType<typeof ModalAddBillComponent>>()

const addBill = () => {
  modalAddBill.value?.open()
}
const redirect = (order: OrderType) => {
  router.replace({ name: 'billEdit', params: { order_id: order.id } })
}
const editItem = (selectedOrder: OrderType) => {
  order.value = selectedOrder
}
const attemptDelete = (selectedOrder: OrderType) => {
  order.value = selectedOrder
}

onMounted(async () => {
  getOrder()
})
</script>

<template>
  <div class="h-full flex flex-col space-y-4">
    <button class="bg-3 w-fit rounded-md p-2 text-sm" title="Tambah Customer" @click="addBill">
      + Tagihan
    </button>
    <div class="bg-2 h-full flex flex-col overflow-auto p-4">
      <div class="h-full max-h-full overflow-y-auto px-2">
        <table>
          <thead class="text-sm">
            <th class="whitespace-nowrap pr-4">
              No Tagihan
            </th>
            <th class="w-full whitespace-nowrap text-left">
              Nama Restoran
            </th>
            <th>Aksi</th>
          </thead>
          <tbody v-if="orders.length > 0" class="items">
            <tr v-for="(item, index) in orders" :key="index">
              <td>
                {{ item.number }}
              </td>
              <td>
                {{ item.restaurant_name }}
              </td>
              <td>
                <div class="flex px-2 py-1 space-x-2">
                  <button-edit @click="editItem(item)" />
                  <button-remove @click="attemptDelete(item)" />
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3">
                <div class="h-16 flex items-center justify-center">
                  Belum ada tagihan
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <modal-add-bill-component ref="modalAddBill" @created="redirect" />
</template>