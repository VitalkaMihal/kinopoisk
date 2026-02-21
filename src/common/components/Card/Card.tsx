import { cardUrl, kinopoisk } from '@/common/constants'
import s from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import {
  addFavoriteMovieAC,
  deleteFavoriteMovieAC,
  type Favorite,
  getMovieIdAC,
  selectFavorites,
} from '@/app/appSlice.ts'
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

  const changeFavoriteHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    if (!isFavorite) {
      dispatch(addFavoriteMovieAC({ poster, title, rating, id }))
    } else {
      dispatch(deleteFavoriteMovieAC({ poster, title, rating, id }))
    }
  }

  const onClickHandler = () => {
    dispatch(getMovieIdAC({ rating, id }))
    navigate(`${kinopoisk.movie}${id}`)
  }

  const className = isFavorite ? s.favoritePosition : `${s.favoritePosition} ${s.favoriteOpacity}`

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
      <div className={className} onClick={changeFavoriteHandler}>
        <FavoriteButton isFavorite={isFavorite} />
      </div>
      <div className={s.overlay}>
        <h3>{title}</h3>
      </div>
    </div>
  )
}
