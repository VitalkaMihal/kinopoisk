import type { ThemeState } from '@/app/appSlice.ts'

export const bgUrl = 'https://image.tmdb.org/t/p/original'
export const cardUrl = 'https://image.tmdb.org/t/p/w500'

export const category = {
  NOW: 'now_playing',
  POPULAR: 'popular',
  TOP: 'top_rated',
  UPCOMING: 'upcoming',
} as const

export const kinopoisk = {
  main: '/kinopoisk',
  category: '/kinopoisk/category/',
  movie: '/kinopoisk/movie/',
  filtered: '/kinopoisk/filtered',
  searchPage: '/kinopoisk/searchPage',
  favorites: '/kinopoisk/favorites',
} as const

export const themeApp = (theme: ThemeState) => ({
  '--background-color': theme === 'light' ? '#fff' : '#222',
  '--text-color': theme === 'light' ? '#000' : '#fff',
  '--header-color': theme === 'light' ? '#d5c9c9' : '#1b1a1a',
})

export type categoryType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'
