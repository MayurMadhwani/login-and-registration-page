import { configureStore } from '@reduxjs/toolkit'
import emailReducer from '../features/email/emailSlice'

export default configureStore({
  reducer: {
    email: emailReducer,
  },
})