import s from './Rating.module.css'

type Props = {
  rating: number
}

const getRatingColor = (voteAverage: number): string => {
  if (voteAverage >= 7) return s.ratingHigh
  if (voteAverage >= 4) return s.ratingMedium
  return s.ratingLow
}

export const Rating = ({ rating }: Props) => {
  const ratingToFixed = rating.toFixed(1)
  const ratingClass = getRatingColor(rating)

  return <div className={`${s.ratingCircle} ${ratingClass}`}>{ratingToFixed}</div>
}
