import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './services/api.js'


import './assets/tailwind.css'

const app = createApp(App)
app.config.globalProperties.$api = api;

app.use(router).use(store).mount('#app')
