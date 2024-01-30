import axios from "axios"

const URLAUTH = '/api/v1/users'



export const getUsers = () => {
  return axios.get(URLAUTH)
}

