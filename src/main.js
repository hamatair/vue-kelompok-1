import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import './assets/base.css'
import './assets/main.css'

import FontAwesomeIcon from './plugins/fontawesome'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

const pinia = createPinia()
app.use(pinia)
const auth = useAuthStore(pinia)
auth.initialize()
app.use(router)

app.mount('#app')
