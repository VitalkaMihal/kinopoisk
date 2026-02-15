import { createSlice } from '@reduxjs/toolkit'
import { category, type categoryType } from '@/common/constants'

const initialState = {
  category: category.POPULAR as categoryType,
  searchText: '' as string,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    changeCategoryAC: create.reducer<categoryType>((state, action) => {
      state.category = action.payload
    }),
    changeSearchAC: create.reducer<string>((state, action) => {
      state.searchText = action.payload
    }),
    getMovieIdAC: create.reducer<{ rating: number; id: number }>((_state, action) => {
      localStorage.setItem('movieInfo', JSON.stringify(action.payload))
    }),
  }),
  selectors: {
    selectCategory: (state) => state.category,
    selectSearchText: (state) => state.searchText,
  },
})

export const { changeCategoryAC, changeSearchAC, getMovieIdAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectCategory, selectSearchText } = appSlice.selectors
