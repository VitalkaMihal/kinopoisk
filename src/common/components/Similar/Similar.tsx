import { useGetSimilarQuery } from '@/features/popular/api/popularApi.ts'
import { Card } from '@/common/components'
import s from './Similar.module.css'

type Props = {
  id: number
}

export const Similar = ({ id }: Props) => {
  const { data } = useGetSimilarQuery(id)

  if (!data) {
    return
  }
  const similarData = data.results.slice(0, 6)

  return (
    <div className={s.similar}>
      <h2>Similar Movies</h2>
      <div className={s.similarMovies}>
        {similarData.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  )
}
