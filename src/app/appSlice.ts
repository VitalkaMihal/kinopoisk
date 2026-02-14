import { createSlice } from '@reduxjs/toolkit'
import { category, type categoryType } from '@/common/constants'

const initialState = {
  category: category.POPULAR as categoryType,
  searchText: '' as string,
  movieId: 0 as number,
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
    getMovieIdAC: create.reducer<number>((state, action) => {
      state.movieId = action.payload
    }),
  }),
  selectors: {
    selectCategory: (state) => state.category,
    selectSearchText: (state) => state.searchText,
    selectMovieId: (state) => state.movieId,
  },
})

export const { changeCategoryAC, changeSearchAC, getMovieIdAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectCategory, selectSearchText, selectMovieId } = appSlice.selectors
