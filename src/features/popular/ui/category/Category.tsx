import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import { category, type categoryType } from '@/common/constants'
import { useState } from 'react'
import { Card } from '@/common/components/Card'
import s from './Category.module.css'
import { selectCategory } from '@/app/appSlice.ts'
import { useAppSelector } from '@/common/hooks'

export const Category = () => {
  const categoryStore = useAppSelector(selectCategory)
  console.log(categoryStore)
  const [categoryMovies, getCategoryMovies] = useState<categoryType>(categoryStore)

  const { data } = useGetPopularQuery(categoryMovies)

  if (!data) {
    return
  }

  return (
    <div className={s.container}>
      <div className={s.buttonsWrapper}>
        <button onClick={() => getCategoryMovies(category.POPULAR)}>Popular Movies</button>
        <button onClick={() => getCategoryMovies(category.TOP)}>Top Rated Movies</button>
        <button onClick={() => getCategoryMovies(category.UPCOMING)}>Upcoming Movies</button>
        <button onClick={() => getCategoryMovies(category.NOW)}>Now Playing Movies</button>
      </div>
      <div className={s.moviesGrid}>
        {data.results.map((movie) => (
          <Card key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
        ))}
      </div>
    </div>
  )
}
