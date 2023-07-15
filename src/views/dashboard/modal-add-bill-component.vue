<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/button/index-component.vue'
import AppInputTextPrefix from '@/components/input/text/input-with-prefix-suffix.vue'
import AppModal from '@/components/modal/index-component.vue'
import { useOrderStore } from '@/stores/order'
import { OrderType } from '@/types/order'

const emit = defineEmits<{
  (e: 'created', data: OrderType): void,
}>()
const order = useOrderStore()
const modal = ref()
const billNumber = ref('')
const restaurantname = ref('')

const open = () => {
  billNumber.value = ''
  restaurantname.value = ''
  modal.value.open()
}
const close = () => {
  modal.value.close()
}

const submit = async () => {
  const response = await order.orderAdd({ number: billNumber.value, name: restaurantname.value })
  if (response) {
    emit('created', response)
    close()
  }
}
defineExpose({ open, close })
</script>

<template>
  <form @submit.prevent="submit">
    <app-modal ref="modal" title="Tambah Tagihan">
      <div class="py-4 space-y-4">
        <div class="space-y-2">
          <label for="bill-number">Nomer Tagihan</label>
          <app-input-text-prefix
            id="bill-number"
            v-model="billNumber"
            v-focus
            :prefix="true">
            <template #prefix>
              <div class="pl-2">
                <svg
                  class="w-6 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" />
                </svg>
              </div>
            </template>
          </app-input-text-prefix>
        </div>
        <div class="space-y-2">
          <label for="restaurant-name">Nama Restoran</label>
          <app-input-text-prefix
            id="restaurant-name"
            v-model="restaurantname"
            :prefix="true">
            <template #prefix>
              <div class="pl-2">
                <svg
                  class="w-6 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
                </svg>
              </div>
            </template>
          </app-input-text-prefix>
        </div>
      </div>
      <template #footer>
        <div class="text-right">
          <app-button :disabled="billNumber == '' || restaurantname == ''" type="submit">
            Tambah
          </app-button>
        </div>
      </template>
    </app-modal>
  </form>
</template>