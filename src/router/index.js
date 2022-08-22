import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "../store/user"
//proteger la ruta
//https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
//middleware para proteger la ruta
const requiereAuthGuard = async (to, from, next) => {
  // El store se debe de inicializar dentro de una funcion para implementar el store fuera de un componente
  // https://pinia.vuejs.org/core-concepts/outside-component-usage.html
  const useStore = useUserStore()
  useStore.loadingSession = true
  const user = await useStore.checkAuthenticationStatus()
  console.log(user)
  if (user) {
    next() //si el usuario esta logueado, seguimos
  } else {
    next({ name: "login" }) //si no esta logueado, redireccionamos a la ruta del login
  }
  useStore.loadingSession = false
}

const routes = [
  {
    name: "auth-layout",
    component: () =>
      import(/* webpackChunkName: "auth" */ "../layout/authLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
      },
    ],
  },
  {
    name: "sistema",
    component: () =>
      import(/* webpackChunkName: "sistema" */ "../layout/sistemaLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        beforeEnter: requiereAuthGuard,
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
      },
      {
        path: "/catalog-1",
        name: "catalog-1",
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

export default router
