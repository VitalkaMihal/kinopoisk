import { Route, Routes } from 'react-router-dom'
import { Main } from '@/features/popular/ui/Main.tsx'
import { Category } from '@/features/popular/ui/category'

export const Path = {
  Main: '/kinopoisk',
  Category: '/kinopoisk/Category',
  Filtered: '/kinopoisk/Filtered',
  Search: '/kinopoisk/Search',
  Favorites: '/kinopoisk/Favorites',
  PageNonFound: '*',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Category} element={<Category />} />
      <Route path={Path.Filtered} element={<h2>Filtered</h2>} />
      <Route path={Path.Search} element={<h2>Search</h2>} />
      <Route path={Path.Favorites} element={<h2>Favorites</h2>} />
      <Route path={Path.PageNonFound} element={<h2>404</h2>} />
    </Routes>
  )
}
