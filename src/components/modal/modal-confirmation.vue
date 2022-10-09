<script setup lang="ts">
import { ref } from 'vue'
import AppModal from '@/components/modal/index.vue'

const emit = defineEmits(['confirm', 'cancel'])
defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  confirmation: {
    type: Boolean,
    default: false,
  },
  cancelation: {
    type: Boolean,
    default: false,
  },
})
const modal = ref(null)

const open = () => {
  modal.value.open()
}
const close = () => {
  modal.value.close()
  emit('cancel')
}

defineExpose({ open, close })
</script>

<template>
  <app-modal ref="modal" :title="title">
    <div class="my-4">
      {{message}}
    </div>
    <template #footer>
      <div class="flex gap-2 justify-end">
        <div>
          <button class="btn whitespace-nowrap btn-unstyled" @click="close">
            Batal
          </button>
        </div>
        <div>
          <button class="btn w-16"
            :class="{'btn-cancel': cancelation, 'btn-primary':confirmation}"
           @click="emit('confirm')">
            Ya
          </button>
        </div>
      </div>
    </template>
  </app-modal>
</template>

<style lang="postcss" scoped>
</style>