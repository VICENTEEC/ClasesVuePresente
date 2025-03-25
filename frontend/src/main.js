import { createApp } from 'vue'
import App from '@/App.vue'
import Home from '@/components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';

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
const ListaEventosAPI = () => import('@/components/ListaEventosAPI.vue')
const Entradas = () => import('@/components/Entradas.vue')

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, name: 'home'},
    { path: '/equipos', component: Equipos, name: 'equipos'},
    { path: '/listaeventos', component: ListaEventos, name: 'listaeventos'},
    { path: '/listaeventosapi', component: ListaEventosAPI, name: 'listaeventosapi'},
    { path: '/entradas', component: Entradas, name: 'entradas'},
    { path: '/:pathMatch(.*)*', component: NotFound, name: 'notfound'}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

import { useAuthStore } from '@/stores/auth'
router.beforeEach(async (to) => {
    const auth = useAuthStore()
    if(!auth.esAdmin && (to.name === 'listaeventosapi' || to.name === 'listaeventos' || to.name === 'equipos' || to.name === 'entradas')){
        return { name: 'home'}
    }
})


const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
