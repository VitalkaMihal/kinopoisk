import { useGetPopularQuery } from '@/features/popular/api/popularApi.ts'
import s from './Main.module.css'
import { bgUrl, category } from '@/common/constants'
import { PreviewCategory } from '@/common/components/PreviewCategory'
import { Search } from '@/common/components'

const random = Math.ceil(Math.random() * 6)

export const Main = () => {
  const { data } = useGetPopularQuery({ category: category.POPULAR, pageNumber: 1 })

  const bgUrlRandom = data?.results[random].backdrop_path
  return (
    <div className={s.main}>
      <div
        className={s.mainBgPicture}
        style={{
          backgroundImage: `url(${bgUrl + bgUrlRandom})`,
        }}
      >
        <div className={s.mainContainer}>
          <h2>Welcome</h2>
          <h4>Browse highlighted titles from TMDB</h4>
          <Search />
        </div>
      </div>
      <PreviewCategory previewCategory={category.POPULAR} titleCategory={'Popular Movies'} />
      <PreviewCategory previewCategory={category.TOP} titleCategory={'Top Rated Movies'} />
      <PreviewCategory previewCategory={category.UPCOMING} titleCategory={'Upcoming Movies'} />
      <PreviewCategory previewCategory={category.NOW} titleCategory={'Now Playing Movies'} />
    </div>
  )
}
