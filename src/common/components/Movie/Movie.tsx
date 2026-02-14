import { useGetDetailsQuery } from '@/features/popular/api/popularApi.ts'
import { useAppSelector } from '@/common/hooks'
import { selectMovieId } from '@/app/appSlice.ts'

export const Movie = () => {
  const id = useAppSelector(selectMovieId)
  const { data } = useGetDetailsQuery(id)
  if (!data) return
  console.log(data)
  return <div>Movie</div>
}
