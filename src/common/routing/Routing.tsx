import { Navigate, Route, Routes } from 'react-router-dom'
import { Main } from '@/features/kinopoisk/ui/Main.tsx'
import { SearchPage } from '@/features/kinopoisk/ui/SearchPage/SearchPage.tsx'
import { PageNotFound } from '@/common/components'
import { kinopoisk } from '@/common/constants'
import { Category, Favorites, FilterAndSort, Movie } from '@/features/kinopoisk/ui'

export const Path = {
  Main: kinopoisk.main,
  Category: `${kinopoisk.category}:categoryName`,
  CategoryActive: `${kinopoisk.category}`,
  Card: `${kinopoisk.movie}:cardName`,
  Filtered: `${kinopoisk.filtered}`,
  SearchPage: `${kinopoisk.searchPage}`,
  Favorites: `${kinopoisk.favorites}`,
  NotFound: '*',
  PageNotFound: `${kinopoisk.notFound}`,
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Category} element={<Category />} />
      <Route path={Path.Card} element={<Movie />} />
      <Route
        path={Path.Filtered}
        element={
          <h2>
            <FilterAndSort />
          </h2>
        }
      />
      <Route path={Path.SearchPage} element={<SearchPage />} />
      <Route
        path={Path.Favorites}
        element={
          <h2>
            <Favorites />
          </h2>
        }
      />
      <Route path={Path.PageNotFound} element={<PageNotFound />} />
      <Route path={Path.NotFound} element={<Navigate to={Path.PageNotFound} />} />
    </Routes>
  )
}
