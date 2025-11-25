import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'
import router from './router'

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
app.use(router)

app.mount('#app')
