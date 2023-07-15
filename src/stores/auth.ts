import { defineStore } from 'pinia'
import { AuthType } from '@/types/auth'
import { useOrderStore } from './order'

interface State {
    user: AuthType,
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {
        id: null,
        name: '',
        email: '',
      },
    }
  },
  getters: {
    getUserInfo (): AuthType {
      return this.user
    },
  },
  actions: {
    setUser (auth: AuthType) {
      this.user.id = auth.id
      this.user.name = auth.name
      this.user.email = auth.email
    },
    removeUser () {
      const order = useOrderStore()
      order.resetStore()
      this.user = {
        id: null,
        name: '',
        email: '',
      }
    },
  },
})