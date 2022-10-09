import { createApp } from 'vue'
import App from './App.vue'

import './assets/tailwind.css'

import { createPinia } from 'pinia'

import router from './router'
import directives from './directives'

createApp(App)
  .use(router)
  .use(directives)
  .use(createPinia())
  .mount('#app')
