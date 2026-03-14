import { useLazyGetDetailsQuery } from '@/features/kinopoisk/api/kinopoiskApi.ts'
import s from './Movie.module.css'
import { cardUrl, kinopoisk } from '@/common/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { Credits, FavoriteButton, Rating, Similar } from '@/common/components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useRef } from 'react'

type MovieInfo = {
  rating: number
  id: number
}

const convertRuntime = (time: number): string => {
  return Math.floor(time / 60) + 'h ' + (time % 60) + 'm'
}

export const Movie = () => {
  const params = useRef<number[]>([])
  const param = Number(useParams().cardName)
  const navigate = useNavigate()
  const movieInfo = JSON.parse(localStorage.getItem('movieInfo') as string) as MovieInfo
  const [trigger, { data, isLoading }] = useLazyGetDetailsQuery()

  useEffect(() => {
    if (param && data?.id !== param) {
      trigger(param)
      params.current.push(param)
    }
    if (!params.current.includes(param)) {
      navigate(kinopoisk.notFound)
    }
  }, [param])

  const backgroundImage = data?.poster_path
    ? `url(${cardUrl + data?.poster_path})`
    : `url(https://placehold.co/280x420/transparent/FOO/png?text=NO+IMAGE)`

  const poster = data?.poster_path || 'https://placehold.co/280x420/transparent/FOO/png?text=NO+IMAGE'

  const goBack = () => {
    navigate(-1)
  }

  const year = data?.release_date.slice(0, 4)

  return (
    <div className={s.container}>
      {isLoading && (
        <div className={s.movieSkeleton}>
          <Skeleton width={'280px'} height={'420px'} borderRadius={'20px'} />
          <Skeleton count={5} height={'40px'} containerClassName={s.movieSkeletonInfo} />
        </div>
      )}
      {data && (
        <>
          <div className={s.details}>
            <div
              className={s.image}
              style={{
                backgroundImage: backgroundImage,
              }}
            ></div>
            <div className={s.text}>
              <div className={s.title}>
                <h2>{data.title}</h2>
                <button onClick={goBack}>Back</button>
              </div>
              <div className={s.info}>
                Release year: {year}
                <FavoriteButton poster={poster} title={data.title} rating={movieInfo.rating} id={movieInfo.id} />
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
        </>
      )}
    </div>
  )
}
