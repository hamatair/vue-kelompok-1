import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './assets/base.css';
import './assets/main.css';

import FontAwesomeIcon from "./plugins/fontawesome";

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');
