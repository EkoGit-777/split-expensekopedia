<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
</script>

<template>
  <div class="toast-wrapper">
    <transition-group name="toast">
      <div v-for="{ id, message } in toast.toasts" :key="id" class="toast-items">
        {{ message }}
      </div>
    </transition-group>
  </div>
</template>

<style lang="postcss" scoped>
.toast-wrapper {
  @apply fixed inset-x-0 flex flex-col pointer-events-none bottom-12 z-50;

  .toast-items {
    @apply px-4 py-1 mb-2 text-white max-w-xs mx-auto text-xs;
    background: #000000AA;
    transition: all 0.8s ease;
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
  }
}
</style>