import { createApp } from 'vue'
import App from '@/App.vue'
import Home from '@/components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
library.add(faUser, faMobileScreen, faInstagram, faFacebook)

const NotFound = () => import('@/components/NotFound.vue')
const Equipos = () => import('@/components/Equipos.vue')
const Eventos = () => import('@/components/Eventos.vue')
const Entradas = () => import('@/components/Entradas.vue')

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, name: 'home'},
    { path: '/equipos', component: Equipos, name: 'equipos'},
    { path: '/eventos', component: Eventos, name: 'eventos'},
    { path: '/entradas', component: Entradas, name: 'entradas'},
    { path: '/:pathMatch(.*)*', component: NotFound, name: 'notfound'}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})



const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
