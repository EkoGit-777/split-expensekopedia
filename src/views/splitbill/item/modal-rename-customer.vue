<script setup lang="ts">
import { computed, ref } from 'vue'
import AppButton from '@/components/button/index-component.vue'
import AppInputSelect from '@/components/input/array/input-select.vue'
import AppInputTextPrefix from '@/components/input/text/input-with-prefix-suffix.vue'
import AppModal from '@/components/modal/index-component.vue'
import { useCustomerModel } from '@/models/customer'
import { useAuthStore } from '@/stores/auth'
import { useOrderStore } from '@/stores/order'


const auth = useAuthStore()
const order = useOrderStore()
const { customers, getData } = useCustomerModel()
const modal = ref<InstanceType<typeof AppModal>>()
const customerName = ref('')
const selectedCustomer = ref<number|null>(null)
const customerList = computed(() => customers.value.map(item => {
  return {
    id: item.id,
    name: item.name,
    disabled: false,
  }
}))

const open = async (id: number|null, name: string) => {
  customerName.value = name
  modal.value?.open()
  if (auth.user.id) {
    selectedCustomer.value = id
    await getData()
  }
}
const close = () => {
  modal.value?.close()
}
const submit = async () => {
  let customer = null
  if (auth.user.id) {
    customer = customers.value.filter(customer => customer.id == selectedCustomer.value)[0]
  }
  await order.peopleRename(customer?.id ?? null, customer?.name ?? customerName.value)
  close()
}
defineExpose({ open, close })
</script>

<template>
  <form @submit.prevent="submit">
    <app-modal ref="modal" title="Tambah Item">
      <div class="py-4 space-y-4">
        <label for="customer-name">Nama Customer</label>
        <template v-if="auth.user.id">
          <app-input-select
            id="customer-name"
            v-model="selectedCustomer"
            class="form-input w-full"
            :list="customerList"
            required />
        </template>
        <template v-else>
          <app-input-text-prefix
            id="customer-name"
            v-model="customerName"
            v-focus
            :prefix="true">
            <template #prefix>
              <div class="pl-2">
                <svg
                  class="h-4 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </div>
            </template>
          </app-input-text-prefix>
        </template>
      </div>
      <template #footer>
        <div class="text-right">
          <app-button :disabled="customerName == '' && !selectedCustomer" type="submit">
            Simpan
          </app-button>
        </div>
      </template>
    </app-modal>
  </form>
</template>