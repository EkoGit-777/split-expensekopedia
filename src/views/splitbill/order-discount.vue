<script setup lang="ts">
import InputCurrency from '@/components/input/number/input-currency.vue'
import InputPercentage from '@/components/input/number/input-percentage.vue'
import { useOrderStore } from '@/stores/order'
import CardFrame from '@/components/container/card-container.vue'
const order = useOrderStore()
</script>

<template>
  <card-frame :title="'Diskon'">
    <div class="space-y-2">
      <div v-for="(discount, index) in order.discounts" :key="index" class="flex items-center">
        <div class="flex-1 flex gap-2 items-center">
          <input-percentage v-model="discount.percent" class="w-20" />
          <input-currency v-model="discount.cash" class="flex-1" />
          <div v-if="order.discounts.length > 1">
            <button type="button" class="text-xs text-gray-400" @click="order.discountRemove(index)">
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <button class="bg-3 rounded-md text-sm p-2" @click="order.discountAdd">
        + Diskon
      </button>
    </div>
  </card-frame>
</template>

<style lang="postcss" scoped>
</style>