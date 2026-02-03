import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import type { categoryType } from '@/common/constants'
import { Card } from '@/common/components/Card'
import s from './PreviewCategory.module.css'

type Props = {
  previewCategory: categoryType
  titleCategory: string
}

export const PreviewCategory = ({ previewCategory, titleCategory }: Props) => {
  const { data } = useGetPopularQuery(previewCategory)

  if (!data) {
    return
  }
  const previevData = data.results.slice(0, 6)

  return (
    <div className={s.container}>
      <span className={s.title}>{titleCategory}</span>
      <div className={s.cards}>
        {previevData.map((movie) => (
          <Card key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
        ))}
      </div>
    </div>
  )
}
