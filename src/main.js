import { createApp } from 'vue'  // ✅ Правильный импорт
import App from './App.vue'
import './assets/main.css'  // Подключаем Tailwind CSS
import router from './router/index.js'


createApp(App).use(router).mount('#app')