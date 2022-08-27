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
    accesToken: null,
    expireIn: null,
    status: "unauthorize",
  }),
  getters: {
    currentStateUser: (state) => state.status,
  },
  actions: {
    async checkAuthenticationStatus() {
      const existeToken = (await this.accesToken) !== null ? true : false
      return existeToken
    },
    setTimeRefresh() {
      setTimeout(() => {
        // console.log("Se solicita automatico refresh");
        this.refreshToken()
      }, 180000)
    },
    async setCurrentUser(userData) {
      //user
      this.userData = {
        userName: userData.displayName,
      }
      this.status = "authenticated"
      //Token's
      this.accesToken = userData.accessToken
      //storage
      localStorage.setItem("accessToken", userData.accessToken)
      localStorage.setItem("refreshToken", userData.refreshToken)
    },
    async loginUser(UserObj) {
      this.loadingUser = true
      try {
        const { data } = await authApi.post("/cuentas/login", UserObj)
        // console.log(data)
        console.log("onLogin ⚡")
        this.setTimeRefresh()
        await this.setCurrentUser(data)
        router.push({ name: "home" })
      } catch (error) {
        return error.response
      } finally {
        this.loadingUser = false
      }
    },
    async refreshToken() {
      try {
        // console.log(this.accesToken)
        const { data } = await authApi.post("/cuentas/refresh", {
          AccessToken: localStorage.getItem("accessToken"),
          RefreshToken: localStorage.getItem("refreshToken"),
        })
        // console.log("onRefresh ⚡: ", data)
        this.setTimeRefresh()
        this.setCurrentUser(data)
      } catch (error) {
        console.log(error)
      }
    },
    logOut() {
      //BORRAMOS EL STATE
      this.userData = null
      this.loadingUser = false
      this.accesToken = null
      this.status = "unauthorize"
      //BORRAMOS LOS DATOS DEL LOCALSTORAGE
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      router.push({ name: "login" })
    },
  },
})
