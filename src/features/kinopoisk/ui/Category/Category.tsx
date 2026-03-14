import { useLazyGetPopularQuery } from '@/features/kinopoisk/api/kinopoiskApi.ts'
import { category, type categoryType, kinopoisk, themeApp } from '@/common/constants'
import s from './Category.module.css'
import { selectTheme } from '@/app/appSlice.ts'
import { useAppSelector } from '@/common/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, LinearProgress, MySkeleton, Pagination } from '@/common/components'
import React, { useEffect, useState } from 'react'
import { isCategory } from '@/common/utils'

export const Category = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const theme = useAppSelector(selectTheme)
  const style = themeApp(theme)
  const navigate = useNavigate()
  const param = useParams() || { categoryName: '' }
  const ParamCategory = param.categoryName || ''

  const [trigger, { data, isLoading, isFetching }] = useLazyGetPopularQuery()

  useEffect(() => {
    if (isCategory(ParamCategory)) {
      trigger({
        category: ParamCategory,
        pageNumber: currentPage,
      })
    } else {
      navigate(kinopoisk.notFound)
    }
  }, [ParamCategory, currentPage])

  let pagesCount = 500
  if (data) pagesCount = data?.total_pages < 500 ? data?.total_pages : 500

  const getCategoryMoviesHandler = (filmCategory: categoryType) => {
    navigate(`${kinopoisk.category}${filmCategory}`)
    setCurrentPage(1)
  }

  const className = (cat: categoryType) => {
    if (ParamCategory === cat) {
      return s.active
    }
  }

  return (
    <>
      {!isLoading && isFetching && <LinearProgress />}
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
        <h3>{param.categoryName}</h3>
        {isLoading && <MySkeleton count={20} />}
        {data && (
          <>
            <div className={s.pagination}>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={pagesCount || 1} />
            </div>
            <div className={s.moviesGrid}>
              {data?.results.map((movie) => (
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
          </>
        )}
      </div>
    </>
  )
}
