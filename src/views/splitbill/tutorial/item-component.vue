<script setup lang="ts">
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import { useTutorialStore } from '@/stores/tutorial'
import TutorialComponent from './tutorial-component.vue'

const tutorial = useTutorialStore()
const items = ref([
  {
    name: 'Ayam Geprek Sambel Ijo',
    price: '15.000',
  },
  {
    name: 'Es Jeruk Jumbo',
    price: '7.000',
  },
],
)
</script>

<template>
  <div class="h-full flex flex-col overflow-auto rounded pb-8">
    <div class="bg-3 flex rounded-t px-4 py-2 text-lg space-x-2">
      <div>John Doe</div>
      <button-edit />
    </div>
    <div class="bg-2 max-h-full flex flex-col overflow-y-auto rounded-b p-4 space-y-4" :class="{'z-20':tutorial.activeState==1}">
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
          <tbody class="items">
            <tr v-for="item in items" :key="item.name">
              <td>
                {{ item.name }}
              </td>
              <td class="text-right">
                {{ item.price }}
              </td>
              <td>
                <div class="flex px-2 space-x-2">
                  <button-edit :class="{'z-20':tutorial.activeState==2}" />
                  <button-remove :class="{'z-20':tutorial.activeState==2}" />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="py-2 pr-8 text-right">
                Total Urunan
              </th>
              <td class="text-right">
                20.092
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="flex justify-between px-2">
        <div>
          <button class="text-link">
            Reset Item
          </button>
        </div>
        <div>
          <button class="text-link">
            Tambah Item
          </button>
        </div>
      </div>
    </div>
  </div>
  <tutorial-component v-if="tutorial.activeState==1" class="top-96" />
  <tutorial-component v-if="tutorial.activeState==2" class="top-96" />
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