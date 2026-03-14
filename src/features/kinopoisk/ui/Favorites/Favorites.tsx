import { useAppSelector } from '@/common/hooks'
import { selectFavorites } from '@/app/appSlice.ts'
import { Card } from '@/common/components'
import s from './Favorites.module.css'

export const Favorites = () => {
  const favorites = useAppSelector(selectFavorites)

  return (
    <div className={s.container}>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className={s.cardContainer}>
          {favorites.map((movie) => (
            <Card key={movie.id} title={movie.title} poster={movie.poster} rating={movie.rating} id={movie.id} />
          ))}
        </div>
      ) : (
        <span>no added movies to Favorites</span>
      )}
    </div>
  )
}
