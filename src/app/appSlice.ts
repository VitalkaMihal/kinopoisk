import { createSlice } from '@reduxjs/toolkit'

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

const initialState = {
  searchText: '' as string,
  favorites: favoriteMovies as Favorite[],
  theme,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
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
    selectSearchText: (state) => state.searchText,
    selectFavorites: (state) => state.favorites,
    selectTheme: (state) => state.theme,
  },
})

export const { changeSearchAC, getMovieIdAC, addFavoriteMovieAC, deleteFavoriteMovieAC, toggleTheme } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectSearchText, selectFavorites, selectTheme } = appSlice.selectors
