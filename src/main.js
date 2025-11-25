import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth' // Import Auth Store

import './assets/base.css'
import './assets/main.css'

import FontAwesomeIcon from './plugins/fontawesome'

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

const pinia = createPinia()
app.use(pinia)
app.use(router)

const authStore = useAuthStore(pinia)
authStore.initialize() // Panggil action initialize di sini

app.mount('#app')
