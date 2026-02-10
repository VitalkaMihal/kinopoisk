import s from './SaerchPage.module.css'
import { useState } from 'react'
import { useLazyGetSearchQuery } from '@/features/popular/api/popularApi.ts'
import { Card } from '@/common/components'

export const SearchPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [textSearchin, setTextSearchin] = useState('')

  const [trigger, { data }] = useLazyGetSearchQuery()

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    trigger(inputValue)
    setTextSearchin(inputValue)
    setInputValue('')
  }

  const handlerInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.currentTarget.value)
  }

  return (
    <div className={s.searchContainer}>
      <div className={s.formContainer}>
        <h2>Search Results</h2>
        <form className={s.form}>
          <input
            type="search"
            onChange={(e) => {
              handlerInput(e)
            }}
            value={inputValue}
          />
          <button
            type="submit"
            onClick={(e) => {
              handleSearch(e)
            }}
          >
            Search
          </button>
        </form>
        <div className={s.text}>
          {!data ? 'Enter a movie title to start searching.' : `Results for "${textSearchin}"`}
        </div>
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
              {`"${textSearchin}".`}
            </span>
          ))}
      </div>
    </div>
  )
}
