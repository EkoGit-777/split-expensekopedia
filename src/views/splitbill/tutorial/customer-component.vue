<script setup lang="ts">
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonHelp from '@/components/button/button-help.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import ButtonToggleShow from '@/components/button/button-toggle-show.vue'
import CardFrame from '@/components/container/card-container.vue'
import { useTutorialStore } from '@/stores/tutorial'
import TutorialComponent from './tutorial-component.vue'

const tutorial = useTutorialStore()
const customers = ref([
  {
    name: 'John Doe',
    totalPurchase: '22.000',
    totalCost: '3.592',
    totalDiscount: '- 5.500',
    netto: '20.092',
    items: [
      {
        name: 'Ayam Geprek Sambel Ijo',
        price: '15.000',
      },
      {
        name: 'Es Jeruk Jumbo',
        price: '7.000',
      },
    ],
  },
  {
    name: 'Melissa Drew',
    totalPurchase: '27.000',
    totalCost: '4.408',
    totalDiscount: '- 6.750',
    netto: '24.658',
    items: [
      {
        name: 'Nasi Uduk Komplit	',
        price: '22.000',
      },
      {
        name: 'Es Teh',
        price: '5.000',
      },
    ],
  },
])
</script>
<template>
  <div class="space-y-4 flex flex-col h-full">
    <div class="relative flex justify-between">
      <div class="bg-3 w-fit rounded-md text-sm p-2" :class="{'z-20':tutorial.activeState==0}">
        + Customer
      </div>
      <button-help />
      <tutorial-component v-if="tutorial.activeState==0" class="top-16" />
    </div>
    <div class="flex flex-col h-full overflow-auto space-y-4">
      <template v-for="customer in customers" :key="customer.name">
        <card-frame :title="customer.name" :class="{'z-20':tutorial.activeState==5}">
          <div class="space-y-2">
            <table class="w-full">
              <tbody class="items">
                <template v-for="item in customer.items" :key="item.name">
                  <tr>
                    <td>{{ item.name }}</td>
                    <td class="text-right">
                      {{ item.price }}
                    </td>
                  </tr>
                </template>
                <tr>
                  <td colspan="2">
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td class="w-full">
                    Total Pesanan
                  </td>
                  <td class="text-right">
                    {{ customer.totalPurchase }}
                  </td>
                </tr>
                <tr>
                  <td class="w-full">
                    Total Biaya
                  </td>
                  <td class="text-right">
                    {{ customer.totalCost }}
                  </td>
                </tr>
                <tr>
                  <td class="w-full">
                    Total Diskon
                  </td>
                  <td class="text-right text-red-500 whitespace-nowrap">
                    {{ customer.totalDiscount }}
                  </td>
                </tr>
                <tr>
                  <td class="border-t">
                    Total Tagihan
                  </td>
                  <td class="border-t text-right">
                    {{ customer.netto }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex space-x-4">
            <button-toggle-show :show="false" :class="{'z-20':tutorial.activeState==6}" />
            <button-edit :class="{'z-20':tutorial.activeState==6}" />
            <button-remove :class="{'z-20':tutorial.activeState==6}" />
          </div>
        </card-frame>
      </template>
      <tutorial-component v-if="tutorial.activeState==5 || tutorial.activeState==6" class="top-8 ml-12 left-96 w-96" />
    </div>
  </div>
</template>