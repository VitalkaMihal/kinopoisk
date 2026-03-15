import { useGetPopularQuery } from '@/features/kinopoisk/api/kinopoiskApi.ts'
import { kinopoisk } from '@/common/constants'
import s from './PreviewCategory.module.css'
import { useNavigate } from 'react-router-dom'
import { CallbackMovie, MySkeleton } from '@/common/components'
import type { Results } from '@/features/kinopoisk/api/kinopoiskApi.types.ts'
import type { categoryType } from '@/common/types'

type Props = {
  previewCategory: categoryType
  titleCategory: string
}

export const PreviewCategory = ({ previewCategory, titleCategory }: Props) => {
  const { data, isLoading } = useGetPopularQuery({ category: previewCategory, pageNumber: 1 })
  const navigate = useNavigate()

  let previewData: Results[] = [] as Results[]

  if (data) previewData = data.results.slice(0, 6)

  const viewMoreHandler = () => {
    navigate(`/${kinopoisk.category}${previewCategory}`)
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
      <div className={s.cards}>{previewData.map((movie) => CallbackMovie(movie))}</div>
    </div>
  )
}
