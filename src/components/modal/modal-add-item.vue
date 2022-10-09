<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppModal from '@/components/modal/index.vue'
import AppInputNumber from '@/components/input/number/index.vue'
import AppInputMoney from '@/components/input/number/input-currency.vue'

import { useOrderStore } from '@/stores/order'
const order = useOrderStore()

const modal = ref(null)
const item = reactive({
  index: null,
  name: '',
  qty: 1,
  price: 0,
})

const open = () => {
  resetItem()
  modal.value.open()
}
const close = () => {
  modal.value.close()
}

const submit = () => {
  item.index = order.selectedPerson
  order.itemAdd(item)
  close()
}
const resetItem = () => {
  item.name = ''
  item.qty = 1
  item.price = 0
}

defineExpose({ open, close })
</script>

<template>
  <form @submit.prevent="submit">
    <app-modal ref="modal" title="Tambah Item">
      <div class="py-4 space-y-4">
        <div>
          <label for="item-name">Pesanan</label>
          <input
            v-model="item.name"
            v-focus
            type="text"
            class="form-input">
        </div>
        <div class="flex space-x-4">
          <div class="w-24">
            <label for="item-qty">Jumlah</label>
            <app-input-number v-model="item.qty" class="form-input" />
          </div>
          <div class="flex-1">
            <label for="item-price">Harga Aplikasi</label>
            <app-input-money v-model="item.price" />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="text-right">
          <button class="btn btn-primary">Tambah</button>
        </div>
      </template>
    </app-modal>
  </form>
</template>

<style lang="postcss" scoped>
</style>