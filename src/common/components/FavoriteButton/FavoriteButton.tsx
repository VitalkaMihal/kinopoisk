import s from './FavoriteButton.module.css'

type Props = {
  // poster: string
  // title: string
  // rating: number
  // id: number
  isFavorite: boolean
}

// type Favorites = Props[]

export const FavoriteButton = ({ isFavorite }: Props) => {
  // const [isFavorite, setIsFavorite] = useState<boolean>(false)
  // const favorites: Favorites = localStorage.getItem('favorites')
  //   ? JSON.parse(localStorage.getItem('favorites'))
  //   : ([] as Favorites)
  //
  // const index = favorites.findIndex((movie) => movie.id === id)

  const favoriteColor = isFavorite ? 'red' : 'green'
  const changeFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }
  //   event.stopPropagation()
  //   if (index !== -1) {
  //     setIsFavorite(false)
  //     favorites.splice(index, 1)
  //   } else {
  //     setIsFavorite(true)
  //     favorites.push({ poster, title, rating, id })
  //   }
  //   localStorage.setItem('favorites', JSON.stringify(favorites))
  // }
  const className = isFavorite ? `${s.favorite} ${s.isFavoriteClass}` : s.favorite

  return (
    <div className={className}>
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
