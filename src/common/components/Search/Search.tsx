import { useState } from 'react'
import s from './Search.module.css'
import { useNavigate } from 'react-router-dom'
import { Path } from '@/common/routing'
import { useAppDispatch } from '@/common/hooks'
import { changeSearchAC } from '@/app/appSlice.ts'

export const Search = () => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(changeSearchAC(inputValue))
    navigate(`${Path.SearchPage}`)
    setInputValue('')
  }

  const handlerInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.currentTarget.value)
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
