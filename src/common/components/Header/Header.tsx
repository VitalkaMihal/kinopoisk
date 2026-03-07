import React from 'react'
import s from './Header.module.css'
import kinopoiskLogo from '@/assets/logo/kinopoisk-logo.svg'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { Path } from '@/common/routing'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { category, kinopoisk, themeApp } from '@/common/constants'
import { changeSearchAC, selectTheme, toggleTheme } from '@/app/appSlice.ts'
import { toast, ToastContainer } from 'react-toastify'

export const Header = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const style = themeApp(theme)
  const notify = () => toast('Wow so easy!')
  const navigate = useNavigate()

  const navigateHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    navigate(`${kinopoisk.category}${category.POPULAR}`)
    window.scrollTo(0, 0)
  }

  return (
    <div style={style as React.CSSProperties} className={s.headerWrapper}>
      <div className={s.headerContainer}>
        <Link
          to={Path.Main}
          onClick={() => {
            window.scrollTo(0, 0)
            dispatch(changeSearchAC(''))
          }}
        >
          <img src={kinopoiskLogo} alt="logo" className={s.logo} />
        </Link>
        <nav className={s.nav}>
          <NavLink
            to={Path.Main}
            end
            className={({ isActive }) => (isActive ? s.isActive : s.link)}
            onClick={() => {
              window.scrollTo(0, 0)
              dispatch(changeSearchAC(''))
            }}
          >
            Main
          </NavLink>
          <NavLink
            to={Path.CategoryActive}
            onClick={(e) => navigateHandler(e)}
            className={({ isActive }) => (isActive ? s.isActive : s.link)}
          >
            Category Movies
          </NavLink>
          <NavLink to={Path.Filtered} className={({ isActive }) => (isActive ? s.isActive : s.link)}>
            Filtered Movies
          </NavLink>
          <NavLink
            to={Path.SearchPage}
            className={({ isActive }) => (isActive ? s.isActive : s.link)}
            onClick={() => {
              dispatch(changeSearchAC(''))
            }}
          >
            Search
          </NavLink>

          <NavLink
            to={Path.Favorites}
            onClick={() => window.scrollTo(0, 0)}
            className={({ isActive }) => (isActive ? s.isActive : s.link)}
          >
            Favorites
          </NavLink>
        </nav>
        <button
          onClick={() => {
            dispatch(toggleTheme())
          }}
          className={s.button}
        >
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    </div>
  )
}
