<script setup lang="ts">
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import CardFrame from '@/components/container/card-container.vue'
import { useTutorialStore } from '@/stores/tutorial'
import TutorialComponent from './tutorial-component.vue'

const tutorial = useTutorialStore()

const discounts = ref([
  {
    id: 1,
    percent: '25',
    cash: '25.000',
  },
])
</script>
<template>
  <card-frame :title="'Diskon'" :class="{'z-20':tutorial.activeState==4}">
    <div class="space-y-2">
      <div v-for="discount in discounts" :key="discount.id" class="flex items-center">
        <div class="flex-1 flex gap-2 items-center">
          <div class="w-20">
            {{ discount.percent }}%
          </div>
          <hr class="h-6 border">
          <div class="text-right w-full">
            {{ discount.cash }}
          </div>
          <button-edit />
          <button-remove />
        </div>
      </div>
    </div>
    <div class="text-right">
      <button class="bg-3 rounded-md text-sm p-2">
        + Biaya
      </button>
    </div>
  </card-frame>
  <tutorial-component v-if="tutorial.activeState==4" class="top-8" />
</template>