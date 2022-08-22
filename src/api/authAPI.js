import axios from "axios"
//https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
const authApi = axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-Type": "application/json",
  },
})
export default authApi
