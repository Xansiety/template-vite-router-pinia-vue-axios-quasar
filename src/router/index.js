import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "../store/user"
import authLayout from "../layout/authLayout.vue"
//proteger la ruta
//https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
//middleware para proteger la ruta
const requiereAuthGuard = async (to, from, next) => {
  const requireAuth = to.meta.auth
  const useStore = useUserStore()
  useStore.loadingSession = true
  const user = await useStore.checkAuthenticationStatus()
  const refreshToken = localStorage.getItem("refreshToken")
  // console.log({ user, refreshToken })

  if (!requireAuth) {
    useStore.loadingSession = false
    return next()
  }

  if (refreshToken !== null && user) {
    console.log("No se realiza petición refresh token")
    useStore.loadingSession = false
    return next()
  }

  if (!user && refreshToken !== null) {
    console.log("onRefreshToken ⚡")
    await useStore.refreshToken() // volvemos a pedir una actualización
    // validar al usuario o token
    if (useStore.idToken !== null && refreshToken !== null) {
      useStore.loadingSession = false
      return next()
    }
    console.log("sin datos para validar")
    return next({ name: "login" })
  }
  useStore.loadingSession = false
  return next({ name: "login" })
}

const routes = [
  {
    path: "/",
    name: "auth",
    component: authLayout,
    children: [
      {
        path: "/",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
      },
    ],
  },
  {
    name: "sistema",
    path: "/sistema",
    meta: {
      auth: true,
    },
    component: () =>
      import(/* webpackChunkName: "sistema" */ "../layout/sistemaLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          auth: true,
        },
        beforeEnter: requiereAuthGuard,
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
      },
      {
        path: "/catalog-1",
        name: "catalog-1",
        // meta: {
        //   auth: true,
        // },
        beforeEnter: requiereAuthGuard,
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/CatalogView.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // linkActiveClass: "active",
  // linkExactActiveClass: "exact-active",
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   const requireAuth = to.meta.auth
//   const useStore = useUserStore()
//   useStore.loadingSession = true
//   const user = await useStore.checkAuthenticationStatus()
//   const refreshToken = localStorage.getItem("refreshToken")
//   // console.log({ user, refreshToken })

//   if (!requireAuth) {
//     useStore.loadingSession = false
//     return next()
//   }

//   if (refreshToken !== null && user) {
//     console.log("No se realiza petición refresh token")
//     useStore.loadingSession = false
//     return next()
//   }

//   if (!user && refreshToken !== null) {
//     console.log("onRefreshToken ⚡")
//     await useStore.refreshToken() // volvemos a pedir una actualización
//     // validar al usuario o token
//     if (useStore.idToken !== null && refreshToken !== null) {
//       useStore.loadingSession = false
//       return next()
//     }
//     console.log("sin datos")
//     return next({ name: "login" })
//   }
//   useStore.loadingSession = false
//   console.log("redireccionamos en este 2")
//   return next({ name: "login" })
// })

export default router
