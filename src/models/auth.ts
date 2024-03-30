import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/functions/api'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

export function useAuthModel () {
  const api = useApi()
  const toast = useToastStore()
  const loading = ref(false)
  const errors = ref<FormError>({})
  const auth = useAuthStore()
  const router = useRouter()

  const form = reactive({
    email: '',
    password: '',
  })

  const checkAuth = async () => {
    let aunthenticated = false
    loading.value = true
    try {
      const response = await api.POST<AuthType>('check')
      if (response) {
        auth.setUser(response)
        aunthenticated = true
      }
    } finally {
      loading.value = false
    }
    return aunthenticated
  }
  const attemptLogin = async () => {
    let aunthenticated = false
    loading.value = true
    try {
      const response = await api.POST<AuthType>('login', form)
      auth.setUser(response)
      toast.add('Selamat Datang')
      aunthenticated = true
    } catch (error) {
      errors.value = api.formErrors(error)
    } finally {
      loading.value = false
    }
    return aunthenticated
  }
  const attemptLogout = async () => {
    loading.value = true
    try {
      await api.POST<AuthType>('logout')
      auth.removeUser()
      router.replace({ name: 'login' })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errors,
    form,
    checkAuth,
    attemptLogin,
    attemptLogout,
  }
}