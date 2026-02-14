import { useGetDetailsQuery } from '@/features/popular/api/popularApi.ts'
import { useAppSelector } from '@/common/hooks'
import { selectMovieId } from '@/app/appSlice.ts'
import s from './Movie.module.css'
import { cardUrl } from '@/common/constants'

export const Movie = () => {
  const id = useAppSelector(selectMovieId)
  const { data } = useGetDetailsQuery(id)
  if (!data) return
  console.log(data)
  return (
    <div className={s.container}>
      <div className={s.details}>
        <div
          className={s.image}
          style={{
            backgroundImage: `url(${cardUrl + data?.backdrop_path})`,
          }}
        ></div>
      </div>
    </div>
  )
}
