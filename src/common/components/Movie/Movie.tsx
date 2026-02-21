import { useGetDetailsQuery } from '@/features/popular/api/popularApi.ts'
import s from './Movie.module.css'
import { cardUrl } from '@/common/constants'
import { useNavigate } from 'react-router-dom'
import { Credits, FavoriteButton, Rating, Similar } from '@/common/components'

type MovieInfo = {
  rating: number
  id: number
}

const convertRuntime = (time: number): string => {
  return Math.floor(time / 60) + 'h ' + (time % 60) + 'm'
}

export const Movie = () => {
  const navigate = useNavigate()
  const movieInfo = JSON.parse(localStorage.getItem('movieInfo') as string) as MovieInfo

  const { data } = useGetDetailsQuery(movieInfo.id)
  if (!data) return

  const goBack = () => {
    navigate(-1)
  }

  const year = data.release_date.slice(0, 4)

  return (
    <div className={s.container}>
      <div className={s.details}>
        <div
          className={s.image}
          style={{
            backgroundImage: `url(${cardUrl + data?.poster_path})`,
          }}
        ></div>
        <div className={s.text}>
          <div className={s.title}>
            <h2>{data.title}</h2>
            <button onClick={goBack}>Back</button>
          </div>
          <div className={s.info}>
            Release year: {year}
            <FavoriteButton poster={data.poster_path} title={data.title} rating={movieInfo.rating} id={movieInfo.id} />
            <Rating rating={movieInfo.rating} />
            Runtime: {convertRuntime(data.runtime)}
          </div>
          <div className={s.overview}>{data.overview}</div>
          <h3 className={s.genresTitle}>Genres</h3>
          <div className={s.genres}>
            {data.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>
      </div>
      <Credits id={movieInfo.id} />
      <Similar id={movieInfo.id} />
    </div>
  )
}
