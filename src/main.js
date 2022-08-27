import { createApp } from "vue"

//pinia
import { createPinia } from "pinia"

// import './style.css'
//quasar
import { Quasar, Dialog, Notify } from "quasar"
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
    Dialog,
    Notify,
  }, // import Quasar plugins and add here
  config: {
    notify: {
      /* look at QuasarConfOptions from the API card */
    },
  },
})

//pinia
app.use(pinia)

//vue router
app.use(router)

app.mount("#app")
