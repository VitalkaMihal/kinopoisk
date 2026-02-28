import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import { category, type categoryType, kinopoisk, themeApp } from '@/common/constants'
import s from './Category.module.css'
import { changeCategoryAC, selectCategory, selectTheme } from '@/app/appSlice.ts'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, Pagination } from '@/common/components'
import React, { useState } from 'react'

export const Category = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const categoryStore = useAppSelector(selectCategory)
  const theme = useAppSelector(selectTheme)
  const style = themeApp(theme)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data } = useGetPopularQuery({ category: categoryStore, pageNumber: currentPage })

  if (!data) {
    return
  }

  const pagesCount = data?.total_pages < 500 ? data?.total_pages : 500

  const getCategoryMoviesHandler = (filmCategory: categoryType) => {
    dispatch(changeCategoryAC(filmCategory))
    navigate(`${kinopoisk.category}${filmCategory}`)
  }

  const className = (cat: categoryType) => {
    if (location.pathname.endsWith(cat)) {
      return s.active
    }
  }

  return (
    <div className={s.container} style={style as React.CSSProperties}>
      <div className={s.buttonsWrapper}>
        <button className={className(category.POPULAR)} onClick={() => getCategoryMoviesHandler(category.POPULAR)}>
          Popular Movies
        </button>
        <button className={className(category.TOP)} onClick={() => getCategoryMoviesHandler(category.TOP)}>
          Top Rated Movies
        </button>
        <button className={className(category.UPCOMING)} onClick={() => getCategoryMoviesHandler(category.UPCOMING)}>
          Upcoming Movies
        </button>
        <button className={className(category.NOW)} onClick={() => getCategoryMoviesHandler(category.NOW)}>
          Now Playing Movies
        </button>
      </div>
      <h3>{categoryStore}</h3>
      <div className={s.pagination}>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={pagesCount || 1} />
      </div>
      <div className={s.moviesGrid}>
        {data.results.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
            id={movie.id}
          />
        ))}
      </div>
      <div className={s.pagination}>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={pagesCount || 1} />
      </div>
    </div>
  )
}
