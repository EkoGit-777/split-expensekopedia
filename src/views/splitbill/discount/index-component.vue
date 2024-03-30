<script setup lang="ts">
import currency from 'currency.js'
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import CardFrame from '@/components/container/card-container.vue'
import { useOrderStore } from '@/stores/order'
import ModalDiscountForm from './modal-form.vue'

const order = useOrderStore()
const modalDiscountFormRef = ref<InstanceType<typeof ModalDiscountForm>>()

const addDiscount = () => {
  modalDiscountFormRef.value?.open({ percent: 0, cash: 0 })
}
const editDiscount = (item: Discount, index: number) => {
  modalDiscountFormRef.value?.open(item, index)
}
</script>

<template>
  <card-frame :title="'Diskon'">
    <div class="space-y-2">
      <div v-for="(discount, index) in order.discounts" :key="index" class="flex items-center">
        <div class="flex flex-1 items-center gap-2">
          <div class="w-20">
            {{ order.currency(currency(discount.percent)).format() }}%
          </div>
          <hr class="h-6 border">
          <div class="w-full text-right">
            {{ order.currency(currency(discount.cash)).format() }}
          </div>
          <button-edit @click="editDiscount(discount, index)" />
          <button-remove @click="order.discountRemove(index)" />
        </div>
      </div>
    </div>
    <div class="text-right">
      <button class="bg-3 rounded-md p-2 text-sm" title="Tambah Diskon" @click="addDiscount">
        + Diskon
      </button>
    </div>
  </card-frame>
  <modal-discount-form ref="modalDiscountFormRef" />
</template>