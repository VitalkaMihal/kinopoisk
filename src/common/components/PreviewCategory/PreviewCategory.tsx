import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import { type categoryType, kinopoiskCategory } from '@/common/constants'
import s from './PreviewCategory.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/common/hooks'
import { changeCategoryAC } from '@/app/appSlice.ts'
import { Card } from '@/common/components'

type Props = {
  previewCategory: categoryType
  titleCategory: string
}

export const PreviewCategory = ({ previewCategory, titleCategory }: Props) => {
  const { data } = useGetPopularQuery(previewCategory)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  if (!data) {
    return
  }
  const previevData = data.results.slice(0, 6)

  const viewMoreHandler = () => {
    navigate(`${kinopoiskCategory}${previewCategory}`)
    dispatch(changeCategoryAC(previewCategory))
    window.scrollTo(0, 0)
  }

  return (
    <div className={s.container}>
      <div className={s.titleBox}>
        <span className={s.title}>{titleCategory}</span>
        <button className={s.titleButton} onClick={viewMoreHandler}>
          View more
        </button>
      </div>
      <div className={s.cards}>
        {previevData.map((movie) => (
          <Card key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
        ))}
      </div>
    </div>
  )
}
