
<script setup lang="ts">
import ButtonInformation from '@/components/button/button-information.vue'
import { useThemeStore } from '@/stores/theme'
import CostComponent from './cost-component.vue'
import CustomerComponent from './customer-component.vue'
import DiscountComponent from './discount-component.vue'
import ItemComponent from './item-component.vue'

const theme = useThemeStore()
</script>
<template>
  <div class="absolute bottom-0 left-0 right-0 top-0 h-full flex p-4" :class="{'bg-gray-900': theme.isDark, 'bg-gray-200':!theme.isDark}">
    <div class="fixed inset-0 z-10 bg-black bg-opacity-60"></div>
    <div class="w-96 flex-none">
      <customer-component />
    </div>
    <div class="mx-auto h-full max-w-2xl w-full px-8">
      <item-component />
    </div>
    <div class="w-72 flex flex-none flex-col overflow-auto space-y-4">
      <cost-component />
      <discount-component />
      <div class="bg-2 py-4 container">
        <div class="flex items-center">
          <button-information />
          <div class="flex-1 text-right">
            <div>
              <div>
                Total yang dibayar di aplikasi
              </div>
              <div class="text-lg font-bold">
                44.750
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>