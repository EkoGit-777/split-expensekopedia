<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import LayoutNavbar from './layout-navbar.vue'

const theme = useThemeStore()
theme.setup()
</script>

<template>
  <layout-navbar class="bg-3 fixed inset-x-0 top-0 z-10" />
  <div class="h-screen pt-14">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>