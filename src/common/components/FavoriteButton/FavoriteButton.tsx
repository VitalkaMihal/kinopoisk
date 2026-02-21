import s from './FavoriteButton.module.css'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { addFavoriteMovieAC, deleteFavoriteMovieAC, type Favorite, selectFavorites } from '@/app/appSlice.ts'

type Props = {
  poster: string
  title: string
  rating: number
  id: number
}

export const FavoriteButton = ({ poster, title, rating, id }: Props) => {
  const dispatch = useAppDispatch()

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
  const favoriteColor = isFavorite ? 'red' : 'yellow'

  const className = isFavorite ? `${s.favorite} ${s.isFavoriteClass}` : s.favorite

  return (
    <div className={className} onClick={changeFavoriteHandler}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill={favoriteColor} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42
             4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
             14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"
        />
      </svg>
    </div>
  )
}
