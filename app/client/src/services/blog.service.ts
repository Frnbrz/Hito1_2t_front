import { Blog } from "@/models"
import axios from "axios"

const URLAUTH = '/api/v1/blog'

export const getPost = () => {
  return axios.get(URLAUTH)
}

export const getPostById = (id: number) => {
  return axios.get(URLAUTH + '/' + id)
}

export const postService = ({ name, text }: Blog) => {
  return axios.post(URLAUTH, {
    name,
    text
  })
}

export const deletePost = (id: number) => {
  return axios.delete(URLAUTH + '/' + id)
}

