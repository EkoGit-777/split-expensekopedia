<script setup lang="ts">
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import ModalConfirmation from '@/components/modal/modal-confirmation.vue'
import { useOrderStore } from '@/stores/order'
import ModalAddItem from './modal-add-item.vue'
import ModalEditItem from './modal-edit-item.vue'
import ModalRenameCustomer from './modal-rename-customer.vue'

const order = useOrderStore()
const modalResetConfirmationRef = ref<InstanceType<typeof ModalConfirmation>>()
const modalAddItemRef = ref<InstanceType<typeof ModalAddItem>>()
const modalEditItemRef = ref<InstanceType<typeof ModalEditItem>>()
const modalRenameCustomerRef = ref<InstanceType<typeof ModalRenameCustomer>>()

const renameCustomer = (id: number|null, name: string) => {
  modalRenameCustomerRef.value?.open(id, name)
}
const addItem = () => {
  modalAddItemRef.value?.open()
}
const editItem = (item: Item, index: number) => {
  modalEditItemRef.value?.open(item, index)
}
const resetList = () => {
  modalResetConfirmationRef.value?.open()
}
</script>

<template>
  <template v-if="typeof order.selectedPerson === 'number' && !Number.isNaN(order.selectedPerson)">
    <div class="h-full flex flex-col overflow-auto rounded pb-8">
      <div class="bg-3 flex rounded-t px-4 py-2 text-lg space-x-2">
        <div>{{ order.people[order.selectedPerson].name }}</div>
        <button-edit @click="renameCustomer(order.people[order.selectedPerson].customerId, order.people[order.selectedPerson].name)" />
      </div>
      <div class="bg-2 max-h-full flex flex-col overflow-y-auto rounded-b p-4 space-y-4">
        <div class="max-h-full overflow-y-auto px-2">
          <table>
            <thead class="text-sm">
              <th class="w-full text-left">
                Pesanan
              </th>
              <th class="whitespace-nowrap text-right">
                Harga
              </th>
              <th>Aksi</th>
            </thead>
            <tbody v-if="order.people[order.selectedPerson].items.length" class="items">
              <tr v-for="(item, index) in order.people[order.selectedPerson].items" :key="index">
                <td>
                  {{ item.name }}
                </td>
                <td class="text-right">
                  {{ order.currency(item.price) }}
                </td>
                <td>
                  <div class="flex px-2 space-x-2">
                    <button-edit @click="editItem(item, index)" />
                    <button-remove @click="order.itemRemove(index)" />
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3">
                  <div class="h-16 flex items-center justify-center">
                    <button class="text-link" @click="addItem">
                      Tambah Item
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="order.people[order.selectedPerson].items.length">
              <tr>
                <th class="py-2 pr-8 text-right">
                  Total Urunan
                </th>
                <td class="text-right">
                  {{ order.personSplitBill(order.selectedPerson).format() }}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="order.people[order.selectedPerson].items.length" class="flex justify-between px-2">
          <div>
            <button class="text-link" @click="resetList">
              Reset Item
            </button>
          </div>
          <div>
            <button class="text-link" @click="addItem">
              Tambah Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <modal-confirmation
    ref="modalResetConfirmationRef"
    :title="'Konfirmasi Reset Item'"
    :message="'Semua item akan dihapus. Anda yakin ingin melanjutkan?'"
    cancelation
    @confirm="order.itemClear()" />
  <modal-add-item ref="modalAddItemRef" />
  <modal-edit-item ref="modalEditItemRef" />
  <modal-rename-customer ref="modalRenameCustomerRef" />
</template>

<style lang="postcss" scoped>
table {

  td,
  th {
    @apply px-2;
  }

  th {
    @apply align-bottom py-4;
  }

  tbody.items td {
    @apply border-b dark:border-gray-700 py-1;
  }

  tbody.items tr:last-child td {
    @apply border-0;
  }

  tbody.items tr {
    @apply hover:bg-black hover:bg-opacity-20;
  }

  tbody.items tr.items-paid {
    @apply line-through text-gray-400 dark:text-gray-500;
  }
}
</style>