<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppInputMoney from '@/components/input/number/input-currency.vue'
import AppInputText from '@/components/input/text/index-component.vue'
import AppModal from '@/components/modal/index-component.vue'
import { useOrderStore } from '@/stores/order'

const order = useOrderStore()

const modal = ref()
const item = reactive({
  indexItem: 0,
  name: '',
  price: 0,
})

const open = ({ name, price }: { name: string, price: number }, i: number) => {
  item.name = name
  item.price = Number(price)
  item.indexItem = i
  modal.value.open()
}
const close = () => {
  modal.value.close()
}

const submit = () => {
  order.itemEdit(item)
  close()
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
        <div class="space-y-4">
          <label for="item-price">Harga Aplikasi</label>
          <app-input-money id="item-price" v-model="item.price" />
        </div>
      </div>
      <template #footer>
        <div class="text-right">
          <button class="btn btn-primary">
            Simpan
          </button>
        </div>
      </template>
    </app-modal>
  </form>
</template>