<script setup lang="ts">
import { ref } from 'vue'
import { useOrderStore } from '@/stores/order'
import ModalConfirmation from '@/components/modal/modal-confirmation.vue'
import ModalAddItem from '@/components/modal/modal-add-item.vue'
const order = useOrderStore()
const modalResetConfirmation = ref(null)
const modalAddItem = ref(null)

const addItem = () => {
  modalAddItem.value.open()
}
const resetList = () => {
  modalResetConfirmation.value.open()
}
</script>

<template>
  <template v-if="typeof order.selectedPerson === 'number' && !Number.isNaN(order.selectedPerson)">
    <div class="flex flex-col h-full rounded overflow-auto pb-8">
      <div class="bg-3 px-4 py-2 text-lg rounded-t">{{order.people[order.selectedPerson].name}}</div>
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
              <tr
                v-for="(item, index) in order.people[order.selectedPerson].items"
                :key="index"
                :class="{'items-paid': item.paid}">
                <td>
                  {{ item.name }}
                </td>
                <td class="text-right">
                  {{order.currency(item.price)}}
                </td>
                <td>
                  <div class="flex space-x-2 px-2">
                    <button class="bg-3 h-8 w-8 p-2 rounded">
                      <svg v-if="!item.paid"
                        class="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                      <svg v-if="item.paid"
                        class="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                    </button>
                    <button class="bg-3 h-8 w-8 p-2 rounded">
                      <svg class="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                    </button>
                    <button class="bg-3 h-8 w-8 p-2 rounded">
                      <svg class="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4">
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
                <th class="text-right py-2">
                  Total Urunan
                </th>
                <td colspan="2" class="text-right">
                  {{ order.personSplitBill(order.selectedPerson).format() }}
                </td>
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
  <ModalConfirmation ref="modalResetConfirmation" cancelation/>
  <ModalAddItem ref="modalAddItem" />
</template>