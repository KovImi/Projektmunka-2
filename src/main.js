import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/global.css'
import './assets/custom-input.css'

const app = createApp(App)

// Dispatch the fetchUserData action to load user data if a token exists
store.dispatch('fetchUserData')

app.use(store).use(router).mount('#app')