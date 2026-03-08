import { Navigate, Route, Routes } from 'react-router-dom'
import { Main } from '@/features/popular/ui/Main.tsx'
import { Category } from '@/features/popular/ui/category'
import { SearchPage } from '@/features/popular/ui/SearchPage/SearchPage.tsx'
import { FilterAndSort, Movie, PageNotFound } from '@/common/components'
import { kinopoisk } from '@/common/constants'
import { Favorites } from '@/features/Favorites'

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
