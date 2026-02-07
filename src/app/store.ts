// app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { themeSliceReducer } from '../features/themeSlice'
import { baseApi } from '@/app/baseApi.ts'
import { appReducer, appSlice } from '@/app/appSlice.ts'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

// типы для типизации
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
