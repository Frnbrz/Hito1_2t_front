import { configureStore } from '@reduxjs/toolkit'
import { NoteInfo, UserInfo } from '../models'
import userSliceReducer from './states/user'
import notesSliceReducer from './states/notes'
export interface AppStore {
  user: UserInfo
  notes: NoteInfo
}

export default configureStore<AppStore>({
  reducer: {
    user: userSliceReducer,
    notes: notesSliceReducer,
  },
})
