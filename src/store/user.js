import { defineStore } from "pinia"
import authApi from "../api/authAPI"
import router from "../router"

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore("userStore", {
  // other options...
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
    idToken: null,
    status: "unauthorize",
  }),
  getters: {
    currentStateUser: (state) => state.status,
  },
  actions: {
    async loginUser(UserObj) {
      this.loadingUser = true
      try {
        const { data } = await authApi.post("/cuentas/login", UserObj)
        if (data.token) {
          localStorage.setItem("idToken", data.token)
          this.idToken = data.token
        }
        this.userData = UserObj.email
        this.status = "authenticated"
        router.push({ name: "home" })
      } catch (error) {
        console.log("error", error)
        return error.message
      } finally {
        this.loadingUser = false
      }
    },
    checkAuthenticationStatus() {
      const idToken = localStorage.getItem("idToken")
      if (!idToken) {
        router.push({ name: "login" })
      }
      return true
    },
    logOut() {
      //BORRAMOS EL STATE
      this.userData = null
      this.loadingUser = false
      this.idToken = null
      this.status = "unauthorize"
      //BORRAMOS LOS DATOS DEL LOCALSTORAGE
      localStorage.removeItem("idToken")
      router.push({ name: "login" })
    },
  },
})
