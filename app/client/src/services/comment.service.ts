import { Comment } from "@/models"
import axios from "axios"

const URLAUTH = '/api/v1/comment'


export const postComment = ({ text, blogId }: Comment) => {
  return axios.post(URLAUTH, {
    blogId,
    text
  })
}

export const updateComment = ({ id, text }: Comment) => {
  return axios.patch(URLAUTH + '/' + id, {
    text
  })
}

export const deleteComment = (id: number) => {
  return axios.delete(URLAUTH + '/' + id)
}

