
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
  <div class="absolute top-0 left-0 right-0 bottom-0 flex p-4 h-full" :class="{'bg-gray-900': theme.isDark, 'bg-gray-200':!theme.isDark}">
    <div class="fixed inset-0 bg-black bg-opacity-60 z-10"></div>
    <div class="w-96 flex-none">
      <customer-component />
    </div>
    <div class="mx-auto px-8 max-w-2xl w-full h-full">
      <item-component />
    </div>
    <div class="w-72 flex flex-col flex-none space-y-4 overflow-auto">
      <cost-component />
      <discount-component />
      <div class="container py-4 bg-2">
        <div class="flex items-center">
          <button-information />
          <div class="text-right flex-1">
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