import { useGetSortAndFilterQuery } from '@/features/popular/api/popularApi.ts'
import { Card } from '@/common/components'
import React, { useState } from 'react'
import type { SortAndFilterParams } from '@/features/popular/api/popularApi.types.ts'
import s from './FilterAndSort.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectTheme } from '@/app/appSlice.ts'
import { themeApp, genresForFilter } from '@/common/constants'

export const FilterAndSort = () => {
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

  const [sort, setSort] = useState<SortAndFilterParams>({ sort_by: options[0].value })

  const [genres, setGenres] = useState<number[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort({ sort_by: event.target.value })
  }

  const changeCenre = (id: number) => {
    setGenres(genres.includes(id) ? [...genres.filter((genre) => genre !== id)] : [...genres, id])
  }

  const sortAndGenre = { ...sort, with_genres: genres }

  const { data } = useGetSortAndFilterQuery(sortAndGenre)

  if (!data) {
    return
  }
  return (
    <div style={style as React.CSSProperties} className={s.filterAndSort}>
      <div className={s.sortContainer}>
        <h3>Filter / Sort</h3>
        <div className={s.sortFilterMenu}>
          <div className={s.sortMenu}>
            <h4>Sort By</h4>
            <select className={s.select} onChange={handleChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
          </div>
        </div>
      </div>
      <div className={s.resultsContainer}>
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
    </div>
  )
}
