import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import { category, type categoryType } from '@/common/constants'
import { useState } from 'react'
import { Card } from '@/common/components/Card'

export const Category = () => {
  const [categoryMovies, getCategoryMovies] = useState<categoryType>(category.POPULAR)

  const { data } = useGetPopularQuery(categoryMovies)
  if (data) {
    console.log(data.results[0])
  }
  if (!data) {
    return
  }

  return (
    <div>
      <button onClick={() => getCategoryMovies(category.POPULAR)}>Popular Movies</button>
      <button onClick={() => getCategoryMovies(category.TOP)}>Top Rated Movies</button>
      <button onClick={() => getCategoryMovies(category.UPCOMING)}>Upcoming Movies</button>
      <button onClick={() => getCategoryMovies(category.NOW)}>Now Playing Movies</button>
      <Card title={data.results[0].title} poster={data.results[0].poster_path} rating={data.results[0].vote_average} />
    </div>
  )
}
