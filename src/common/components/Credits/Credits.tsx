import { useGetCreditsQuery } from '@/features/popular/api/popularApi.ts'
import s from './Credits.module.css'
import { cardUrl } from '@/common/constants'

type Props = {
  id: number
}

export const Credits = ({ id }: Props) => {
  const { data } = useGetCreditsQuery(id)
  if (!data) return

  return (
    <div className={s.credits}>
      <h2>Cast</h2>
      <div className={s.actors}>
        {data.cast.slice(0, 6).map((actor) => (
          <div className={s.actor} key={actor.id}>
            <img src={cardUrl + actor.profile_path} alt={actor.name} />
            <h4>{actor.name}</h4>
            <span>{actor.character}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
