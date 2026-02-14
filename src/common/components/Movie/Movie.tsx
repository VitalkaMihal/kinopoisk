import { useGetDetailsQuery } from '@/features/popular/api/popularApi.ts'
import s from './Movie.module.css'
import { cardUrl } from '@/common/constants'
import { useNavigate } from 'react-router-dom'

export const Movie = () => {
  const navigate = useNavigate()

  const { data } = useGetDetailsQuery(Number(localStorage.getItem('movieId')))
  if (!data) return
  console.log(data)

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
          <div className={s.info}>Release year: {year}</div>
        </div>
      </div>
    </div>
  )
}
