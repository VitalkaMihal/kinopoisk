import { useGetSortAndFilterQuery } from '@/features/popular/api/popularApi.ts'
import { Card, Pagination } from '@/common/components'
import React, { useState } from 'react'
import type { SortAndFilterParams } from '@/features/popular/api/popularApi.types.ts'
import s from './FilterAndSort.module.css'
import { useAppSelector, useDebounce } from '@/common/hooks'
import { selectTheme } from '@/app/appSlice.ts'
import { genresForFilter, themeApp } from '@/common/constants'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export const FilterAndSort = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const theme = useAppSelector(selectTheme)
  const style = themeApp(theme)

  const options = [
    { value: 'popularity.desc', label: 'Popularity ↓' },
    { value: 'popularity.asc', label: 'Popularity ↑' },
    { value: 'vote_average.desc', label: 'Rating ↓' },
    { value: 'vote_average.asc', label: 'Rating ↑' },
    { value: 'title.asc', label: 'Title A-Z' },
    { value: 'title.desc', label: 'Title Z-A' },
    { value: 'primary_release_date.desc', label: 'Release date ↓' },
    { value: 'primary_release_date.asc', label: 'Release date ↑' },
  ]

  const [sort, setSort] = useState<{ sort_by: string }>({ sort_by: options[0].value })

  const [genres, setGenres] = useState<number[]>([])

  const [ratingRange, setRatingRange] = useState<number[]>([0, 10])

  const handleChangeRating = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setRatingRange([values[0], values[1]])
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort({ sort_by: event.target.value })
  }

  const changeCenre = (id: number) => {
    setGenres(genres.includes(id) ? [...genres.filter((genre) => genre !== id)] : [...genres, id])
  }

  const resetHandler = () => {
    setGenres([])
    setSort({ sort_by: options[0].value })
    setRatingRange([0, 10])
  }

  const sortAndGenre: SortAndFilterParams = useDebounce(
    {
      ...sort,
      with_genres: genres,
      'vote_average.gte': ratingRange[0],
      'vote_average.lte': ratingRange[1],
      page: currentPage,
    },
    500,
  )

  const { data } = useGetSortAndFilterQuery(sortAndGenre)

  if (!data) {
    return
  }

  const pagesCount = data?.total_pages < 500 ? data?.total_pages : 500

  return (
    <div style={style as React.CSSProperties} className={s.filterAndSort}>
      <div className={s.sortContainer}>
        <h3>Filter / Sort</h3>
        <div className={s.sortFilterMenu}>
          <div className={s.sortMenu}>
            <h4>Sort By</h4>
            <select className={s.select} onChange={handleChange} value={sort.sort_by}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={s.sliderContainer}>
            <h4>
              Рейтинг: {ratingRange[0]} - {ratingRange[1]}
            </h4>
            <Slider
              range
              min={0}
              max={10}
              step={0.1}
              allowCross={false}
              value={ratingRange}
              onChange={handleChangeRating}
              styles={{
                track: { backgroundColor: 'blue', height: 8 },
                rail: { backgroundColor: 'white', height: 8 },
                handle: { backgroundColor: 'blue', height: 17, borderColor: 'blue', opacity: 1 },
              }}
            />
          </div>
          <h3>Genres</h3>
          <div className={s.genresContainer}>
            {genresForFilter.map((genre) => {
              const active = genres?.includes(genre.id) ? s.isActive : s.buttons
              return (
                <button className={active} key={genre.id} onClick={() => changeCenre(genre.id)}>
                  {genre.name}
                </button>
              )
            })}
          </div>{' '}
          <button className={s.reset} onClick={resetHandler}>
            Reset filters
          </button>
        </div>
      </div>
      <div className={s.resultsContainer}>
        <div className={s.pagination}>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={pagesCount || 1} />
        </div>
        <div className={s.cards}>
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
    </div>
  )
}
