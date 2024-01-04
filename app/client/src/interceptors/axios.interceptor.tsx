import { getValidationsError } from "@/utilities"
import { SnackbarUtilities } from "@/utilities/snackbarManager"
import axios from "axios"

export const AxiosInterceptor = () => {
  // const updateHeader = (request: AxiosRequestConfig) => {
  //   const token = localStorage.getItem("token")
  //   const newHeaeders = {
  //     Autorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   }
  //   request.headers = newHeaeders
  //   return request
  // }

  // axios.interceptors.request.use((request) => {
  //   if (request.url?.includes('assets')) return request
  //   return updateHeader(request)
  // })

  axios.interceptors.response.use(
    (response) => {

      if (response.config.method !== 'get') SnackbarUtilities.success("Operación exitosa")
      return response
    },
    (error) => {
      SnackbarUtilities.error(getValidationsError(error.code))
      return Promise.reject(error)
    }
  )
}