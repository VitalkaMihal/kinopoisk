import { cardUrl, kinopoisk } from '@/common/constants'
import s from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/common/hooks'
import { getMovieIdAC } from '@/app/appSlice.ts'

type Props = {
  poster: string
  title: string
  rating: number
  id: number
}

const getRatingColor = (voteAverage: number): string => {
  if (voteAverage >= 7) return s.ratingHigh
  if (voteAverage >= 4) return s.ratingMedium
  return s.ratingLow
}

const ratingToFixed = (num: number): string => num.toFixed(1)

export const Card = ({ poster, title, rating, id }: Props) => {
  const dispatch = useAppDispatch()
  const ratingClass = getRatingColor(rating)
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
      <div className={`${s.ratingCircle} ${ratingClass}`}>{ratingToFixed(rating)}</div>
      <div className={s.overlay}>
        <h3>{title}</h3>
      </div>
    </div>
  )
}
