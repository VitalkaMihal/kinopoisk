import s from './SaerchPage.module.css'
import { useLazyGetSearchQuery } from '@/features/popular/api/popularApi.ts'
import { Card, Search } from '@/common/components'
import { selectSearchText } from '@/app/appSlice.ts'
import { useAppSelector } from '@/common/hooks'
import { useEffect } from 'react'

export const SearchPage = () => {
  const searchingText = useAppSelector(selectSearchText)

  const [trigger, { data }] = useLazyGetSearchQuery()

  useEffect(() => {
    if (searchingText) trigger(searchingText)
  }, [searchingText])

  return (
    <div className={s.searchContainer}>
      <h2>Search Results</h2>
      <Search />
      <div className={s.text}>
        {!data ? 'Enter a movie title to start searching.' : `Results for "${searchingText}"`}
      </div>
      <div className={s.cards}>
        {data &&
          (data.results.length ? (
            data.results.map((movie) => (
              <Card key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
            ))
          ) : (
            <span>
              {`No matches found for`}
              <br />
              {`"${searchingText}".`}
            </span>
          ))}
      </div>
    </div>
  )
}
