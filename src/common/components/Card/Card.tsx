import { cardUrl, kinopoisk } from '@/common/constants'
import s from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { type Favorite, getMovieIdAC, selectFavorites } from '@/app/appSlice.ts'
import { FavoriteButton, Rating } from '@/common/components'

type Props = {
  poster: string
  title: string
  rating: number
  id: number
}

export const Card = ({ poster, title, rating, id }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const favorites = useAppSelector(selectFavorites)
  const isFavorite = favorites?.length > 0 ? Boolean(favorites.find((favorite: Favorite) => favorite.id === id)) : false

  const backgroundImage = poster
    ? `url(${cardUrl + poster})`
    : `url(https://placehold.co/180x270/transparent/FOO/png?text=NO+IMAGE)`

  const onClickHandler = () => {
    dispatch(getMovieIdAC({ rating, id }))
    navigate(`${kinopoisk.movie}${id}`)
    window.scrollTo(0, 0)
  }

  const className = isFavorite ? s.favoritePosition : `${s.favoritePosition} ${s.favoriteOpacity}`

  return (
    <div
      onClick={onClickHandler}
      className={s.card}
      style={{
        backgroundImage,
      }}
    >
      <div className={s.ratingPosition}>
        <Rating rating={rating} />
      </div>
      <div className={className}>
        <FavoriteButton poster={poster} title={title} rating={rating} id={id} />
      </div>
      <div className={s.overlay}>
        <h3>{title}</h3>
      </div>
    </div>
  )
}
