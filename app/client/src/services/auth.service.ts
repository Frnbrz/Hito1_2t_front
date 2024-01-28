import { UserLogin, UserRegister } from "@/models"
import axios from "axios"

const URLAUTH = '/api/v1/auth/'

const URL = {
  login: `${URLAUTH}login`,
  register: `${URLAUTH}register`
}



export const loginService = ({ email, password }: UserLogin) => {
  return axios.post(URL.login, {
    email,
    password

  })
}





export const registerService = async ({ email, name, password }: UserRegister) => {

  return axios.post(URL.register, {
    email,
    name,
    password
  })
}

