<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppButton from '@/components/button/index-component.vue'
import AppInputNumber from '@/components/input/number/index-component.vue'
import AppInputMoney from '@/components/input/number/input-currency.vue'
import AppInputText from '@/components/input/text/index-component.vue'
import AppModal from '@/components/modal/index-component.vue'
import { useOrderStore } from '@/stores/order'

const order = useOrderStore()
const modal = ref<InstanceType<typeof AppModal>>()
const item = reactive({
  index: 0,
  name: '',
  qty: 1,
  price: 0,
})

const open = () => {
  resetItem()
  modal.value?.open()
}
const close = () => {
  modal.value?.close()
}
const submit = () => {
  item.index = order.selectedPerson ?? 0
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
        <div class="space-y-4">
          <label for="item-name">Pesanan</label>
          <app-input-text id="item-name" v-model="item.name" v-focus />
        </div>
        <div class="flex space-x-4">
          <div class="w-24 space-y-4">
            <label for="item-qty">Jumlah</label>
            <app-input-number id="item-qty" v-model="item.qty" class="form-input" />
          </div>
          <div class="flex-1 space-y-4">
            <label for="item-price">Harga Aplikasi</label>
            <app-input-money id="item-price" v-model="item.price" />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="text-right">
          <app-button :disabled="item.name == '' || item.price == 0 || item.qty == 0" type="submit">
            Tambah
          </app-button>
        </div>
      </template>
    </app-modal>
  </form>
</template>