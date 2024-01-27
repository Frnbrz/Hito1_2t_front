import { UserState } from '@/models'
import { clearLocalStorage, persistLocalStorage } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyUserState: UserState = {
  email: '',
  token: '',
}

export const UserKey = 'user'

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      console.log(action.payload)
      persistLocalStorage<UserState>(UserKey, action.payload)
      return action.payload
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<UserState>(UserKey, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage(UserKey)
      return EmptyUserState
    },
  },
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
