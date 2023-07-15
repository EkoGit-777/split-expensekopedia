<script setup lang="ts">
import currency from 'currency.js'
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import CardFrame from '@/components/container/card-container.vue'
import { useOrderStore } from '@/stores/order'
import ModalCostForm from './modal-form.vue'

const order = useOrderStore()
const modalCostFormRef = ref()

const addCost = () => {
  modalCostFormRef.value.open({ id: null, title: '', nominal: 0 })
}
const editCost = (item: Cost, index: number) => {
  modalCostFormRef.value.open(item, index)
}
</script>

<template>
  <card-frame :title="'Biaya'">
    <div class="space-y-2">
      <div v-for="(cost, index) in order.costs" :key="index" class="flex items-center">
        <div class="flex-1 flex gap-2 items-center">
          <div class="w-20">
            {{ cost.title }}
          </div>
          <div class="text-right w-full">
            {{ order.currency(currency(cost.nominal)).format() }}
          </div>
          <button-edit @click="editCost(cost, index)" />
          <button-remove @click="order.costRemove(index)" />
        </div>
      </div>
    </div>
    <div class="text-right">
      <button class="bg-3 rounded-md text-sm p-2" title="Tambah Biaya Ongkos Kirim" @click="addCost">
        + Biaya
      </button>
    </div>
  </card-frame>
  <modal-cost-form ref="modalCostFormRef" />
</template>