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
const modalResetConfirmationRef = ref()
const modalAddItemRef = ref()
const modalEditItemRef = ref()
const modalRenameCustomerRef = ref()

const renameCustomer = (id: number|null, name: string) => {
  modalRenameCustomerRef.value.open(id, name)
}
const addItem = () => {
  modalAddItemRef.value.open()
}
const editItem = (item: Item, index: number) => {
  modalEditItemRef.value.open(item, index)
}
const resetList = () => {
  modalResetConfirmationRef.value.open()
}
</script>

<template>
  <template v-if="typeof order.selectedPerson === 'number' && !Number.isNaN(order.selectedPerson)">
    <div class="flex flex-col h-full rounded overflow-auto pb-8">
      <div class="flex bg-3 px-4 py-2 text-lg rounded-t space-x-2">
        <div>{{ order.people[order.selectedPerson].name }}</div>
        <button-edit @click="renameCustomer(order.people[order.selectedPerson].customerId, order.people[order.selectedPerson].name)" />
      </div>
      <div class="flex flex-col bg-2 p-4 space-y-4 rounded-b max-h-full overflow-y-auto">
        <div class="overflow-y-auto px-2 max-h-full">
          <table>
            <thead class="text-sm">
              <th class="text-left w-full">
                Pesanan
              </th>
              <th class="text-right whitespace-nowrap">
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
                  <div class="flex space-x-2 px-2">
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
                <th class="text-right py-2 pr-8">
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
        <div v-if="order.people[order.selectedPerson].items.length" class="px-2 flex justify-between">
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