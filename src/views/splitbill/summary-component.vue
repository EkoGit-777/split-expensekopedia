<script setup lang="ts">
import { ref } from 'vue'
import ButtonInformation from '@/components/button/button-information.vue'
import { useOrderStore } from '@/stores/order'

const order = useOrderStore()
const showDetail = ref(false)
</script>

<template>
  <div class="bg-2 py-4 container">
    <div class="flex items-center">
      <div v-if="showDetail === false">
        <button-information @click="showDetail = true" />
      </div>
      <div class="flex-1 text-right">
        <template v-if="showDetail === true">
          <div>
            <button class="p-2" type="button" @click="showDetail = false">
              ✕
            </button>
          </div>
          <table>
            <thead>
              <th class="w-full"></th>
              <th class="w-px"></th>
            </thead>
            <tbody>
              <tr>
                <td>Total Belanja</td>
                <td>{{ order.subtotal.format() }}</td>
              </tr>
              <tr>
                <td>Diskon</td>
                <td>{{ order.totalDiscount.format() }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <hr>
                </td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>{{ order.subtotalAfterDiscount.format() }}</td>
              </tr>
              <tr>
                <td>Biaya</td>
                <td>{{ order.totalCost.format() }}</td>
              </tr>
            </tbody>
          </table>
        </template>
        <div>
          <div>
            Total yang dibayar di aplikasi
          </div>
          <div class="text-lg font-bold">
            {{ order.subtotalAfterCost.format() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
table {
  @apply my-4 text-sm;

  td {
    @apply text-right first:w-full last:w-px py-1 first:px-4 last:font-bold;
  }
}
</style>