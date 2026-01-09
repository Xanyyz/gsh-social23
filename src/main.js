import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import { useUserStore } from './stores/userStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 🔥 Charger l'utilisateur AVANT de monter l'app
const userStore = useUserStore()
userStore.loadUser()

app.mount('#app')
