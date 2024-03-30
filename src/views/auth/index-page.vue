<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SubmitButton from '@/components/button/index-component.vue'
import InputPassword from '@/components/input/text/input-password.vue'
import InputBox from '@/components/input/text/input-with-prefix-suffix.vue'
import ErrorMessage from '@/components/label/error-message.vue'
import { useAuthModel } from '@/models/auth'

const route = useRoute()
const router = useRouter()
const { loading, errors, form, checkAuth, attemptLogin } = useAuthModel()

const attempLogin = async () => {
  const authenticated = await attemptLogin()
  if (authenticated) {
    redirectHome()
  }
}
const redirectHome = () => {
  router.replace('/' + (route.query.r ?? ''))
}
const loginGuest = () => {
  router.replace({ name: 'billCreate' })
}
onMounted(async () => {
  const authenticated = await checkAuth()
  if (authenticated) {
    redirectHome()
  }
})
</script>
<template>
  <div class="h-full flex justify-center">
    <div class="my-auto max-h-fit text-center space-y-4">
      <h1 class="text-3xl">
        Selamat Datang
      </h1>
      <h2 class="text-lg">
        Silahkan Login Untuk Melanjutkan
      </h2>
      <div class="w-96 border border-gray-600 rounded-xl bg-white px-8 py-4 text-left">
        <form class="space-y-2" @submit.prevent="attempLogin">
          <label for="email" class="text-lg text-black font-medium">Email</label>
          <input-box
            id="email"
            v-model="form.email"
            autocomplete="email"
            :prefix="true"
            :placeholder="'Email'">
            <template #prefix>
              <div class="pl-2">
                <svg
                  class="h-4 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
                </svg>
              </div>
            </template>
          </input-box>
          <error-message :message="errors.email" />
          <label for="password" class="text-lg text-black font-medium">Password</label>
          <input-password v-model="form.password" :prefix-icon="true" />
          <error-message :message="errors.password" />
          <div class="pt-2 space-y-2">
            <submit-button class="bg-3 w-full rounded-md p-2" :type="'submit'" :loading="loading">
              Login
            </submit-button>
            <hr class="border-2 border-gray-500">
            <submit-button class="bg-3 w-full rounded-md p-2" :loading="loading" @click="loginGuest">
              Login as Guest
            </submit-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>