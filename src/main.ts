import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/app.scss'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
}

app.use(Toast, toastOptions)
app.mount('#app')
