import { useEffect, useState } from 'react'
import s from './Search.module.css'
import { useNavigate } from 'react-router-dom'
import { Path } from '@/common/routing'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { changeSearchAC, selectSearchText } from '@/app/appSlice.ts'

export const Search = () => {
  const searchingText = useAppSelector(selectSearchText)
  const [inputValue, setInputValue] = useState(searchingText)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setInputValue(searchingText)
  }, [searchingText])

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(changeSearchAC(inputValue))
    navigate(`${Path.SearchPage}`)
  }

  const handlerInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.currentTarget.value)
    if (value.currentTarget.value === '') {
      dispatch(changeSearchAC(''))
    }
  }

  return (
    <div className={s.formContainer}>
      <form className={s.form}>
        <input
          type="search"
          onChange={(e) => {
            handlerInput(e)
          }}
          value={inputValue}
        />
        <button
          disabled={!inputValue}
          type="submit"
          onClick={(e) => {
            handleSearch(e)
          }}
        >
          Search
        </button>
      </form>
    </div>
  )
}
