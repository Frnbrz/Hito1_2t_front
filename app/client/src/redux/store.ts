import { Blog, UserInfo } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import blogSliceReducer from './states/blog'
import blogByIdSliceReducer from './states/blogById'
import userSliceReducer from './states/user'

export interface AppStore {
  user: UserInfo
  blog: Blog[]
  blogById: Blog
}

export default configureStore<AppStore>({
  reducer: {
    user: userSliceReducer,
    blog: blogSliceReducer,
    blogById: blogByIdSliceReducer,
  },
})
