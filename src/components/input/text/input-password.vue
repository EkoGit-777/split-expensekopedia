<script setup lang="ts">
import { computed, ref } from 'vue'
import InputText from '@/components/input/text/index-component.vue'

interface Props {
  modelValue: string,
  placeholder?: string,
  errorForm?: boolean,
  prefixIcon?: boolean,
  autocomplete?: string,
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Password',
  errorForm: false,
  prefixIcon: false,
  autocomplete: 'current-password',
})
const emit = defineEmits<{
  (e: 'update:modelValue', data: string): void,
}>()
const typePassword = ref('password')
const value = computed({
  get: () => props.modelValue ?? '',
  set: (newValue: string) => emit('update:modelValue', newValue),
})
</script>
<template>
  <div class="relative w-full flex outline-none bg-none">
    <input-text
      id="password"
      v-model="value"
      :type="typePassword"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="pr-12 py-2 w-full border rounded focus:outline-none"
      :class="{ 'border-red-500': errorForm, 'border-gray-300': !errorForm, 'pl-12': prefixIcon, 'pl-2': !prefixIcon }" />
    <button
      class="absolute right-4 top-2 focus:outline-none"
      @mouseleave="typePassword = 'password'"
      @mousedown="typePassword = 'text'"
      @mouseup="typePassword = 'password'">
      <template v-if="typePassword === 'password'">
        <svg
          class="w-6 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
        </svg>
      </template>
      <template v-else>
        <svg
          class="w-6 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
        </svg>
      </template>
    </button>
    <template v-if="prefixIcon">
      <div class="absolute left-4 top-2">
        <svg
          class="w-6 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
        </svg>
      </div>
    </template>
  </div>
</template>