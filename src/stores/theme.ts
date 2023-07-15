import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return { style: 'system' }
  },
  getters: {
    isDark (): boolean {
      if (this.style === 'dark') {
        return true
      }
      if (this.style === 'light') {
        return false
      }
      return this.style === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
  },
  actions: {
    setup () {
      if (localStorage.theme === 'dark') {
        this.style = 'dark'
      } else if (localStorage.theme === 'light') {
        this.style = 'light'
      } else {
        this.style = 'system'
      }
      this.apply()
    },
    apply () {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    change (theme: string) {
      if (theme === 'dark' || theme === 'light') {
        localStorage.theme = theme
        this.style = theme
      } else {
        localStorage.removeItem('theme')
        this.style = 'system'
      }
      this.apply()
    },
    toggle () {
      if (this.isDark) {
        this.change('light')
      } else {
        this.change('dark')
      }
    },
  },
})