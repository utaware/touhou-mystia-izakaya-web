import { createApp } from 'vue'
// css-about
import 'minireset.css'
import 'normalize.css'

import '@/styles/index.scss'
// vue
import router from './router'

import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
