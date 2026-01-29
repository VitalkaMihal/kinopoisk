import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import s from './Main.module.css'
import { bgUrl, category } from '@/common/constants'

const random = Math.ceil(Math.random() * 6)

export const Main = () => {
  const { data } = useGetPopularQuery(category.POPULAR)

  const bgUrlRandom = data?.results[random].backdrop_path
  return (
    <div
      className={s.main}
      style={{
        backgroundImage: `url(${bgUrl + bgUrlRandom})`,
      }}
    >
      <div className={s.mainContainer}>
        <h2>Welcome</h2>
        <h4>Browse highlighted titles from TMDB</h4>
      </div>
    </div>
  )
}
