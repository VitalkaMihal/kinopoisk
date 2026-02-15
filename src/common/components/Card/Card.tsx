import { cardUrl, kinopoisk } from '@/common/constants'
import s from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/common/hooks'
import { getMovieIdAC } from '@/app/appSlice.ts'
import { Rating } from '@/common/components'

type Props = {
  poster: string
  title: string
  rating: number
  id: number
}

export const Card = ({ poster, title, rating, id }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickHandler = () => {
    dispatch(getMovieIdAC(id))
    navigate(`${kinopoisk.movie}${id}`)
  }

  return (
    <div
      onClick={onClickHandler}
      className={s.card}
      style={{
        backgroundImage: `url(${cardUrl + poster})`,
      }}
    >
      <div className={s.ratingPosition}>
        <Rating rating={rating} />
      </div>
      <div className={s.overlay}>
        <h3>{title}</h3>
      </div>
    </div>
  )
}
