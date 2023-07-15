<script setup lang="ts">
import { computed, ref } from 'vue'
import CardFrame from '@/components/container/card-container.vue'
import { useTutorialStore } from '@/stores/tutorial'

const tutorial = useTutorialStore()
const tutorialList = computed(() => tutorial.getActiveHelp)
const indexTutorial = ref(0)

const next = () => {
  if (tutorialList.value.length == indexTutorial.value + 1) {
    tutorial.nextState()
    indexTutorial.value = 0
  } else {
    indexTutorial.value++
  }
}
</script>
<template>
  <card-frame class="absolute z-20">
    <div>
      {{ tutorialList[indexTutorial] }}
    </div>
    <div class="text-right">
      <button @click="next">
        Selanjutnya
      </button>
    </div>
  </card-frame>
</template>