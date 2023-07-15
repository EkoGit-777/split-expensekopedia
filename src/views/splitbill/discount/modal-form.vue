<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppButton from '@/components/button/index-component.vue'
import InputCurrency from '@/components/input/number/input-currency.vue'
import InputPercentage from '@/components/input/number/input-percentage.vue'
import AppModal from '@/components/modal/index-component.vue'
import { useOrderStore } from '@/stores/order'

const order = useOrderStore()
const modal = ref()
const index = ref(null)
const discount = reactive({
  id: null,
  percent: 0,
  cash: 0,
})

const open = ({ percent, cash }: {percent: number, cash: number}, i = null) => {
  discount.percent = percent
  discount.cash = cash
  index.value = i
  modal.value.open()
}
const close = () => {
  modal.value.close()
}
const submit = () => {
  if (index.value == null) {
    order.discountAdd(discount)
  } else {
    order.discountEdit(discount, index.value)
  }
  close()
}

defineExpose({ open, close })
</script>

<template>
  <form @submit.prevent="submit">
    <app-modal ref="modal" title="Tambah Diskon">
      <div class="flex space-x-2">
        <div class="w-20">
          <label for="discount-percent">Persen</label>
          <input-percentage id="discount-percent" v-model="discount.percent" />
        </div>
        <div class="flex-1">
          <label for="discount-cash">Diskon Tunai / Maksimal</label>
          <input-currency id="discount-cash" v-model="discount.cash" />
        </div>
      </div>
      <template #footer>
        <div class="text-right">
          <app-button :disabled="discount.percent == 0 && discount.cash == 0" type="submit">
            {{ index == null ? 'Tambah' : 'Simpan' }}
          </app-button>
        </div>
      </template>
    </app-modal>
  </form>
</template>