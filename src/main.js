import { createApp } from "vue"

//pinia
import { createPinia } from "pinia"

// import './style.css'
//quasar
import { Quasar, Dialog } from "quasar"
import "@quasar/extras/material-icons/material-icons.css"
import "quasar/src/css/index.sass"

import App from "./App.vue"

//router
import router from "../src/router/index.js"

//pinia
const pinia = createPinia()

const app = createApp(App)
app.use(Quasar, {
  plugins: {
    Dialog
  }, // import Quasar plugins and add here
})

//pinia
app.use(pinia)

//vue router
app.use(router)

app.mount("#app")
