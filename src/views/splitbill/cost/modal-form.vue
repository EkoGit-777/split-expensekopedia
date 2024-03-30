<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppButton from '@/components/button/index-component.vue'
import AppInputMoney from '@/components/input/number/input-currency.vue'
import AppInputText from '@/components/input/text/index-component.vue'
import AppModal from '@/components/modal/index-component.vue'
import { useOrderStore } from '@/stores/order'

const order = useOrderStore()
const modal = ref<InstanceType<typeof AppModal>>()
const index = ref<number|null>(null)
const cost = reactive<Cost>({
  id: null,
  title: '',
  nominal: 0,
})

const open = ({ id, title, nominal }: Cost, i?: number) => {
  cost.id = id
  cost.title = title
  cost.nominal = nominal
  index.value = i ?? null
  modal.value?.open()
}
const close = () => {
  modal.value?.close()
}
const submit = () => {
  if (index.value == null) {
    order.costAdd(cost)
  } else {
    order.costEdit(cost, index.value)
  }
  close()
}

defineExpose({ open, close })
</script>

<template>
  <form @submit.prevent="submit">
    <app-modal ref="modal" title="Tambah Biaya">
      <div class="py-4 space-y-4">
        <div class="space-y-4">
          <label for="cost-title">Nama Biaya</label>
          <app-input-text
            id="cost-title"
            v-model="cost.title"
            v-focus
            placeholder="(Ongkir, Kemasan, Pajak, Parkir, dsb)" />
        </div>
        <div class="space-y-4">
          <label for="cost-nominal">Nominal Biaya</label>
          <app-input-money id="cost-nominal" v-model="cost.nominal" />
        </div>
      </div>
      <template #footer>
        <div class="text-right">
          <app-button :disabled="cost.title == '' || cost.nominal == 0" type="submit">
            {{ index == null ? 'Tambah' : 'Simpan' }}
          </app-button>
        </div>
      </template>
    </app-modal>
  </form>
</template>