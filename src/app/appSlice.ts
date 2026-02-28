import { createSlice } from '@reduxjs/toolkit'
import { category, type categoryType } from '@/common/constants'

export type Favorite = {
  poster: string
  title: string
  rating: number
  id: number
}

export type ThemeState = 'light' | 'dark'

const theme: ThemeState =
  typeof localStorage.getItem('theme') === 'string' ? (localStorage.getItem('theme') as ThemeState) : 'light'

const favoriteMovies =
  typeof localStorage.getItem('favorites') === 'string'
    ? JSON.parse(localStorage.getItem('favorites') as string)
    : ([] as Favorite[])

const categoryFromStorage = JSON.parse(localStorage.getItem('category') as string)

const categoryValue = (categoryFromStorage ? categoryFromStorage : category.POPULAR) as categoryType

const initialState = {
  category: categoryValue as categoryType,
  searchText: '' as string,
  favorites: favoriteMovies as Favorite[],
  theme,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    changeCategoryAC: create.reducer<categoryType>((state, action) => {
      state.category = action.payload
      localStorage.setItem('category', JSON.stringify(action.payload))
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
    toggleTheme: create.reducer((state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    }),
  }),
  selectors: {
    selectCategory: (state) => state.category,
    selectSearchText: (state) => state.searchText,
    selectFavorites: (state) => state.favorites,
    selectTheme: (state) => state.theme,
  },
})

export const {
  changeCategoryAC,
  changeSearchAC,
  getMovieIdAC,
  addFavoriteMovieAC,
  deleteFavoriteMovieAC,
  toggleTheme,
} = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectCategory, selectSearchText, selectFavorites, selectTheme } = appSlice.selectors
