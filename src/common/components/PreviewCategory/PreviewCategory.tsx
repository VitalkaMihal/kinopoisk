import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import { type categoryType, kinopoisk } from '@/common/constants'
import s from './PreviewCategory.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/common/hooks'
import { changeCategoryAC } from '@/app/appSlice.ts'
import { Card, MySkeleton } from '@/common/components'
import type { Results } from '@/features/popular/api/popularApi.types.ts'

type Props = {
  previewCategory: categoryType
  titleCategory: string
}

export const PreviewCategory = ({ previewCategory, titleCategory }: Props) => {
  const { data, isLoading } = useGetPopularQuery({ category: previewCategory, pageNumber: 1 })
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  let previewData: Results[] = [] as Results[]

  if (data) previewData = data.results.slice(0, 6)

  const viewMoreHandler = () => {
    navigate(`${kinopoisk.category}${previewCategory}`)
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
      {isLoading && <MySkeleton count={6} />}
      <div className={s.cards}>
        {previewData.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  )
}
