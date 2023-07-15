<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

theme.setup()
</script>
<template>
  <div class="h-screen">
    <router-view />
  </div>
</template>