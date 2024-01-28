import { Blog } from '@/models'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyBlogState: Blog = {
  id: undefined,
  name: '',
  text: '',
  userEmail: '',
  comments: [],
}

export const blogByIdSlice = createSlice({
  name: 'posts',
  initialState: EmptyBlogState,
  reducers: {
    fetchBlogById: (state, action) => {
      return action.payload
    },
    createBlogById: (state, action) => {
      return action.payload
    },
    updateBlogById: (state, action) => {
      const result = { ...state, ...action.payload }
      return result
    },
    resetBlogById: () => EmptyBlogState,
  },
})

export const { fetchBlogById, createBlogById, updateBlogById, resetBlogById } = blogByIdSlice.actions

export default blogByIdSlice.reducer
