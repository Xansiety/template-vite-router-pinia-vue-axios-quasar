import { useUserStore } from "@/store/user.js"
const useAuth = () => {
  const userStore = useUserStore()

  const checkAuthStatus = async () => {
    const resp = await userStore.checkAuthenticationStatus()
    return resp
  }

  const singInUser = async (user) => {
    const response = await userStore.loginUser(user)
    return response
  }

  const logout = () => {
    userStore.logOut()
  }

  const checkLoadingSession = () => {
    return userStore.loadingSession
  }

  return {
    checkAuthStatus,
    checkLoadingSession,
    singInUser,
    logout,
  }
}

export default useAuth
