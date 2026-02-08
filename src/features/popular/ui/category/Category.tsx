import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import { category, type categoryType, kinopoiskCategory } from '@/common/constants'
import s from './Category.module.css'
import { changeCategoryAC, selectCategory } from '@/app/appSlice.ts'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/common/components'

export const Category = () => {
  const categoryStore = useAppSelector(selectCategory)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { data } = useGetPopularQuery(categoryStore)

  const getCategoryMoviesHandler = (filmCategory: categoryType) => {
    dispatch(changeCategoryAC(filmCategory))
    navigate(`${kinopoiskCategory}${filmCategory}`)
  }

  if (!data) {
    return
  }

  return (
    <div className={s.container}>
      <div className={s.buttonsWrapper}>
        <button onClick={() => getCategoryMoviesHandler(category.POPULAR)}>Popular Movies</button>
        <button onClick={() => getCategoryMoviesHandler(category.TOP)}>Top Rated Movies</button>
        <button onClick={() => getCategoryMoviesHandler(category.UPCOMING)}>Upcoming Movies</button>
        <button onClick={() => getCategoryMoviesHandler(category.NOW)}>Now Playing Movies</button>
      </div>
      <div className={s.moviesGrid}>
        {data.results.map((movie) => (
          <Card key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
        ))}
      </div>
    </div>
  )
}
