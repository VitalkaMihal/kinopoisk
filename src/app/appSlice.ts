import { createSlice } from '@reduxjs/toolkit'
import { category, type categoryType } from '@/common/constants'

export type Favorite = {
  poster: string
  title: string
  rating: number
  id: number
}

const favoriteMovies =
  typeof localStorage.getItem('favorites') === 'string'
    ? JSON.parse(localStorage.getItem('favorites') as string)
    : ([] as Favorite[])

const initialState = {
  category: category.POPULAR as categoryType,
  searchText: '' as string,
  favorites: favoriteMovies as Favorite[],
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
    addFavoriteMovieAC: create.reducer<Favorite>((state, action) => {
      state.favorites.push(action.payload)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }),
    deleteFavoriteMovieAC: create.reducer<Favorite>((state, action) => {
      const index = state.favorites.findIndex((movie) => movie.id === action.payload.id)
      if (index !== -1) state.favorites.splice(index, 1)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }),
  }),
  selectors: {
    selectCategory: (state) => state.category,
    selectSearchText: (state) => state.searchText,
    selectFavorites: (state) => state.favorites,
  },
})

export const { changeCategoryAC, changeSearchAC, getMovieIdAC, addFavoriteMovieAC, deleteFavoriteMovieAC } =
  appSlice.actions
export const appReducer = appSlice.reducer
export const { selectCategory, selectSearchText, selectFavorites } = appSlice.selectors
