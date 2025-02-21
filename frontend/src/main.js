import { createApp } from 'vue'
import App from '@/App.vue'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faMobileScreen } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faMobileScreen)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
