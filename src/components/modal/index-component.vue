<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string,
}>()

const display = ref(false)
const dim = ref(false)

const open = () => {
  dim.value = true
  setTimeout(() => {
    display.value = true
  }, 100)
}
const close = () => {
  display.value = false
}
const afterLeave = () => {
  dim.value = false
}

defineExpose({ open, close })
</script>

<template>
  <div v-show="dim" class="fixed inset-0 z-40 flex items-center justify-center">
    <div class="fixed inset-0 bg-black bg-opacity-40"></div>
    <transition name="modal" @after-leave="afterLeave">
      <div v-if="display" class="z-50 max-h-full w-full flex p-4 container">
        <div class="bg-2 flex flex-1 flex-col">
          <slot name="header">
            <div v-if="title" class="relative">
              <div class="px-4 py-2 text-center text-lg font-bold">
                {{ title }}
              </div>
              <div class="absolute right-2 top-0">
                <button class="p-2 hover:opacity-75" type="button" @click="close">
                  ✕
                </button>
              </div>
            </div>
          </slot>

          <div class="flex-1 overflow-y-auto px-4">
            <slot></slot>
          </div>

          <template v-if="$slots['footer']">
            <div class="p-4">
              <slot name="footer"></slot>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="postcss" scoped>
  .modal-enter-active,
  .modal-leave-active {
      transition: opacity 0.3s ease, margin-top 0.3s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
      margin-top: -50px;
      opacity: 0;
  }
</style>
