import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/css/main.css'
import 'vue3-toastify/dist/index.css';

createApp(App).use(store).use(router).mount('#app')
