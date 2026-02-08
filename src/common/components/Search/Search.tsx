import { useLazyGetSearchQuery } from '@/features/popular/api/popularApi.ts'
import { Card } from '@/common/components'
import { useState } from 'react'
import s from './Search.module.css'

export const Search = () => {
  const [inputValue, setInputValue] = useState('')
  const [trigger, { data, error }] = useLazyGetSearchQuery()

  console.log(error)

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    trigger(inputValue)
  }

  const handlerInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.currentTarget.value)
  }

  return (
    <div className={s.searchContainer}>
      <form>
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
      <div className={s.cards}>
        {data &&
          data.results.map((movie) => (
            <Card key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
          ))}
      </div>
    </div>
  )
}
