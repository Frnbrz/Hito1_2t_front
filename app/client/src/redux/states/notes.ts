import { createSlice } from '@reduxjs/toolkit'
import { NoteInfo } from '@/models'

export const EmptyUserState: NoteInfo = {
  notes: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState: EmptyUserState,
  reducers: {
    fetchNotes: (state, action) => {
      return action.payload
    },
    createNote: (state, action) => {
      return action.payload
    },
    updateNote: (state, action) => {
      const result = { ...state, ...action.payload }
      return result
    },
    resetNotes: () => EmptyUserState,
  },
})

export const { fetchNotes, createNote, updateNote } = notesSlice.actions

export default notesSlice.reducer
