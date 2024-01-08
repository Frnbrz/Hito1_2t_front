import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/'
const noteUrl = baseUrl + 'notes/'

export const getNotes = () => {
  return axios.get(noteUrl)
}

export const getNotesError = () => {
  return axios.get(noteUrl + 'error')
}

export const getNote = (noteId: number) => {
  return axios.get(noteUrl + noteId)
}
