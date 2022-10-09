<script setup lang="ts">
import InputCurrency from '@/components/input/number/input-currency.vue'
import { useOrderStore } from '@/stores/order'
import CardFrame from '@/components/container/card-container.vue'
const order = useOrderStore()
</script>

<template>
  <card-frame :title="'Biaya'">
    <div class="space-y-2">
      <div v-for="(cost, index) in order.costs" :key="index" class="flex items-center">
        <div class="flex-1 flex gap-2 items-center">
          <div class="w-20">{{cost.title}}</div>
          <input-currency v-model="cost.nominal" class="flex-1" />
          <button type="button" class="text-xs text-gray-400" @click="order.costRemove(index)">
            ✕
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-end space-x-2">
      <button class="bg-3 rounded-md text-sm p-2" @click="order.costAdd('Ongkir')">
        + Ongkir
      </button>
      <button class="bg-3 rounded-md text-sm p-2" @click="order.costAdd('Parkir')">
        + Parkir
      </button>
      <button class="bg-3 rounded-md text-sm p-2" @click="order.costAdd('Pajak')">
        + Pajak
      </button>
    </div>
    <div class="flex justify-end space-x-2">
      <button class="bg-3 rounded-md text-sm p-2" @click="order.costAdd('Kemasan')">
        + Kemasan
      </button>
      <button class="bg-3 rounded-md text-sm p-2" @click="order.costAdd('Lain - Lain')">
        + Lain - Lain
      </button>
    </div>
  </card-frame>
</template>

<style lang="postcss" scoped>
</style>