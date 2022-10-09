<script setup lang="ts">
import { ref } from 'vue'
import { useOrderStore } from '@/stores/order'
const order = useOrderStore()
const showDetail = ref(false)
</script>

<template>
  <div class="container py-4 bg-2">
    <div class="flex items-center">
      <div v-if="showDetail === false">
        <button @click="showDetail = true">
          <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" /></svg>
        </button>
      </div>
      <div class="text-right flex-1">
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
                <td colspan="2"><hr></td>
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