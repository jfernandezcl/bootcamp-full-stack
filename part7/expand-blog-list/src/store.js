import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notification'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store
