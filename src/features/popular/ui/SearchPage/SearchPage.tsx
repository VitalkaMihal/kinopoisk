import s from './SaerchPage.module.css'
import { useLazyGetSearchQuery } from '@/features/popular/api/popularApi.ts'
import { Card, LinearProgress, MySkeleton, Pagination, Search } from '@/common/components'
import { selectSearchText } from '@/app/appSlice.ts'
import { useAppSelector } from '@/common/hooks'
import { useEffect, useState } from 'react'

export const SearchPage = () => {
  const searchingText = useAppSelector(selectSearchText)
  const [currentPage, setCurrentPage] = useState(1)

  const [trigger, { data, isLoading, isFetching }] = useLazyGetSearchQuery()

  useEffect(() => {
    if (searchingText) {
      trigger({
        search: searchingText,
        pageNumber: currentPage,
      })
    }
  }, [searchingText, currentPage])

  let pagesCount = 500

  if (data) pagesCount = data?.total_pages < 500 ? data?.total_pages : 500

  return (
    <>
      {!isLoading && isFetching && <LinearProgress />}
      <div className={s.searchContainer}>
        <h2>Search Results</h2>
        <Search />
        <div className={s.text}>
          {!searchingText ? 'Enter a movie title to start searching.' : `Results for "${searchingText}"`}
        </div>
        {data && searchingText && (
          <div className={s.pagination}>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={pagesCount || 1} />
          </div>
        )}
        <div className={s.cards}>
          {isLoading && <MySkeleton count={20} />}
          {data &&
            searchingText &&
            (data.results.length ? (
              data.results.map((movie) => (
                <Card
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                  id={movie.id}
                />
              ))
            ) : (
              <span>
                {`No matches found for`}
                <br />
                {`"${searchingText}".`}
              </span>
            ))}
        </div>
        {data && searchingText && (
          <div className={s.pagination}>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={pagesCount || 1} />
          </div>
        )}
      </div>
    </>
  )
}
