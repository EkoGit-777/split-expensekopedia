import './assets/tailwind.css'
import '@unocss/reset/tailwind.css'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
