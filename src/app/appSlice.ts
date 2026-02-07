import { createSlice } from '@reduxjs/toolkit'
import { category, type categoryType } from '@/common/constants'

const initialState = {
  category: category.POPULAR as categoryType,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    changeCategoryAC: create.reducer<categoryType>((state, action) => {
      state.category = action.payload
    }),
  }),
  selectors: {
    selectCategory: (state) => state.category,
  },
})

export const { changeCategoryAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectCategory } = appSlice.selectors
