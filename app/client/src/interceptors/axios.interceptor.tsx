import { getValidationsError } from "@/utilities"
import { SnackbarUtilities } from "@/utilities/snackbarManager"
import axios from "axios"

export const AxiosInterceptor = () => {

  axios.interceptors.response.use(
    (response) => {
      if (response.status > 200) SnackbarUtilities.success("Operación exitosa")
      return response
    },
    (error) => {
      SnackbarUtilities.error(getValidationsError(error.code))
      return Promise.reject(error)
    }
  )

  axios.interceptors.request.use(
    (config) => {
      const user = localStorage.getItem("user")
      const token = JSON.parse(user || "{}").token
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}