<script setup lang="ts">
import { ref } from 'vue'
import ButtonEdit from '@/components/button/button-edit.vue'
import ButtonRemove from '@/components/button/button-remove.vue'
import CardFrame from '@/components/container/card-container.vue'
import { useTutorialStore } from '@/stores/tutorial'
import TutorialComponent from './tutorial-component.vue'

const tutorial = useTutorialStore()
const costs = ref([
  {
    title: 'Ongkir',
    nominal: '6.000',
  },
  {
    title: 'Parkir',
    nominal: '2.000',
  },
])
</script>
<template>
  <card-frame :title="'Biaya'" :class="{'z-20':tutorial.activeState==3}">
    <div class="space-y-2">
      <div v-for="cost in costs" :key="cost.title" class="flex items-center">
        <div class="flex flex-1 items-center gap-2">
          <div class="w-20">
            {{ cost.title }}
          </div>
          <div class="w-full text-right">
            {{ cost.nominal }}
          </div>
          <button-edit />
          <button-remove />
        </div>
      </div>
    </div>
    <div class="text-right">
      <button class="bg-3 rounded-md p-2 text-sm">
        + Biaya
      </button>
    </div>
  </card-frame>
  <tutorial-component v-if="tutorial.activeState==3" class="top-56" />
</template>