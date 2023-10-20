import './assets/main.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import App from './App.vue'
import Primevue from 'primevue/config'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import Rating from 'primevue/rating'

const app = createApp(App)

app.use(Primevue, { ripple: true })
app.component('Button', Button)
app.component('Slider', Slider)
app.component('Rating', Rating)

app.use(router)
app.use(createPinia())

app.mount('#app')
