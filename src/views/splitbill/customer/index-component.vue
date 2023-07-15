<script setup lang="ts">
import currency from 'currency.js'
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonHelp from '@/components/button/button-help.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import ButtonToggleShow from '@/components/button/button-toggle-show.vue'
import CardFrame from '@/components/container/card-container.vue'
import { useOrderStore } from '@/stores/order'
import { useTutorialStore } from '@/stores/tutorial'
import ModalAddCustomer from './modal-add-customer.vue'

const order = useOrderStore()
const page = useTutorialStore()
const modalAddCustomerRef = ref()

const addCustomer = () => {
  modalAddCustomerRef.value.open()
}
</script>

<template>
  <div class="space-y-4 flex flex-col h-full">
    <div class="flex justify-between">
      <button class="bg-3 w-fit rounded-md text-sm p-2" title="Tambah Customer" @click="addCustomer">
        + Customer
      </button>
      <button-help @click="page.showHelpPage" />
    </div>
    <div class="flex flex-col h-full overflow-auto space-y-4">
      <template v-if="order.people.length > 0">
        <template v-for="(person, index) in order.people" :key="index">
          <card-frame :title="person.name">
            <div class="space-y-2">
              <table class="w-full">
                <tbody class="items">
                  <template v-if="person.showBill">
                    <template v-if="person.items.length > 0">
                      <template v-for="(item) in person.items" :key="item.name">
                        <tr>
                          <td>{{ item.name }}</td>
                          <td class="text-right">
                            {{ order.currency(currency(item.price)).format() }}
                          </td>
                        </tr>
                      </template>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="2" class="italic">
                          Belum ada pesanan
                        </td>
                      </tr>
                    </template>
                    <tr>
                      <td colspan="2">
                        <hr>
                      </td>
                    </tr>
                  </template>
                  <tr>
                    <td class="w-full">
                      Total Pesanan
                    </td>
                    <td class="text-right">
                      {{ order.personSubtotal(index).format() }}
                    </td>
                  </tr>
                  <template v-if="order.personCost(index).intValue > 0">
                    <tr>
                      <td class="w-full">
                        Total Biaya
                      </td>
                      <td class="text-right">
                        {{ order.personCost(index).format() }}
                      </td>
                    </tr>
                  </template>
                  <template v-if="order.personDiscount(index).intValue > 0">
                    <tr>
                      <td class="w-full">
                        Total Diskon
                      </td>
                      <td class="text-right text-red-500 whitespace-nowrap">
                        - {{ order.personDiscount(index).format() }}
                      </td>
                    </tr>
                  </template>
                  <tr>
                    <td class="border-t">
                      Total Tagihan
                    </td>
                    <td class="border-t text-right">
                      {{ order.personSplitBill(index).format() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex space-x-4">
              <button-toggle-show :show="person.showBill" @click="order.peopleToggleShowBill(index)" />
              <button-edit @click="order.peopleEdit(index)" />
              <button-remove @click="order.peopleRemove(index)" />
            </div>
          </card-frame>
        </template>
      </template>
      <template v-else>
        <div class="flex h-full items-center justify-center bg-2">
          Belum ada customer
        </div>
      </template>
    </div>
  </div>
  <modal-add-customer ref="modalAddCustomerRef" />
</template>