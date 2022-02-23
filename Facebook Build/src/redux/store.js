import { configureStore } from '@reduxjs/toolkit'
import loaderSlice from './slices/loaderSlice'
import userSlice from './slices/userSlice'
import storySlice from './slices/storySlice'

export const store = configureStore({
    reducer: {
        loader: loaderSlice,
        user: userSlice,
        stories: storySlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),

})