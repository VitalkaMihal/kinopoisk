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
  category: '/kinopoisk/Category/',
  movie: '/kinopoisk/movie/',
  filtered: '/kinopoisk/filtered',
  searchPage: '/kinopoisk/searchPage',
  favorites: '/kinopoisk/favorites',
  notFound: '/kinopoisk/404',
} as const

export const themeApp = (theme: ThemeState) => ({
  '--background-color': theme === 'light' ? '#fff' : '#222',
  '--text-color': theme === 'light' ? '#000' : '#fff',
  '--header-color': theme === 'light' ? '#d5c9c9' : '#1b1a1a',
})

export const genresForFilter = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Abenteuer',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Komödie',
  },
  {
    id: 80,
    name: 'Krimi',
  },
  {
    id: 99,
    name: 'Dokumentarfilm',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Familie',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'Historie',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Musik',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Liebesfilm',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV-Film',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'Kriegsfilm',
  },
  {
    id: 37,
    name: 'Western',
  },
] as const
