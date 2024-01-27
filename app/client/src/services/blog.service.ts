import axios from "axios"

const URLAUTH = '/api/v1/blog'

export const getPost = () => {
  return axios.get(URLAUTH)
}

export const getPostById = (id: number) => {
  return axios.get(URLAUTH + '/' + id)
}

