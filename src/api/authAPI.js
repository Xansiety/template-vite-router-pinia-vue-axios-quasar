import axios from "axios"
//https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

axios.defaults.withCredentials = true

const authApi = axios.create({
  baseURL: "https://localhost:7299/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

export default authApi
