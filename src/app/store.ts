// app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { themeSliceReducer } from '../features/themeSlice'
import { baseApi } from '@/app/baseApi.ts'
import { appReducer } from '@/app/appSlice.ts'

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    app: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

// типы для типизации
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
