import { Blogs } from '@/models'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyBlogState: Blogs =
  [
    {
      id: undefined,
      name: '',
      text: '',
      userEmail: '',
      comments: [],
    }
  ]

export const blogSlice = createSlice({
  name: 'posts',
  initialState: EmptyBlogState,
  reducers: {
    fetchBlog: (state, action) => {
      return action.payload
    },
    createBlog: (state, action) => {
      return action.payload
    },
    updateBlog: (state, action) => {
      const result = { ...state, ...action.payload }
      return result
    },
    fetchBlogById: (state, action) => {
      return action.payload
    },
    resetNotes: () => EmptyBlogState,
  },
})

export const { fetchBlog, createBlog, updateBlog, fetchBlogById } = blogSlice.actions

export default blogSlice.reducer
