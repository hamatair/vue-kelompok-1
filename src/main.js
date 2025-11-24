import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './assets/base.css';
import './assets/main.css';

import FontAwesomeIcon from "./plugins/fontawesome";

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');
