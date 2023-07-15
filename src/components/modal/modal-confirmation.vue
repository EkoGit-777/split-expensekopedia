<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/button/index-component.vue'
import AppModal from '@/components/modal/index-component.vue'

const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'cancel'): void,
}>()
interface Props {
  title?: string,
  message?: string,
  confirmation?: boolean,
  cancelation?: boolean,
}
withDefaults(defineProps<Props>(), {
  title: 'Konfirmasi Menyimpan Data',
  message: 'Anda yakin ingin menyimpan data?',
  errorForm: false,
  prefixIcon: false,
})
const modal = ref()

const open = () => {
  modal.value.open()
}
const close = () => {
  modal.value.close()
}
const confirm = () => {
  emit('confirm')
  close()
}
const cancel = () => {
  emit('cancel')
  close()
}

defineExpose({ open, close })
</script>

<template>
  <app-modal ref="modal" :title="title">
    <div class="my-4">
      {{ message }}
    </div>
    <template #footer>
      <div class="flex gap-2 justify-end">
        <div>
          <button class="btn whitespace-nowrap btn-unstyled border border-white" @click="cancel">
            Batal
          </button>
        </div>
        <div>
          <app-button @click="confirm">
            Ya
          </app-button>
        </div>
      </div>
    </template>
  </app-modal>
</template>

