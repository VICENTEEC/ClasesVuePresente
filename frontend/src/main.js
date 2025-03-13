import { createApp } from 'vue'
import App from '@/App.vue'
import Home from '@/components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faMobileScreen, faFutbol, faArrowsSpin, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
library.add(faUser, faMobileScreen, faInstagram, faFacebook, faFutbol, faArrowsSpin, faTrash, faPenToSquare)

const NotFound = () => import('@/components/NotFound.vue')
const Equipos = () => import('@/components/Equipos.vue')
const ListaEventos = () => import('@/components/ListaEventos.vue')
const Entradas = () => import('@/components/Entradas.vue')

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, name: 'home'},
    { path: '/equipos', component: Equipos, name: 'equipos'},
    { path: '/listaeventos', component: ListaEventos, name: 'listaeventos'},
    { path: '/entradas', component: Entradas, name: 'entradas'},
    { path: '/:pathMatch(.*)*', component: NotFound, name: 'notfound'}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const pinia = createPinia()


const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
