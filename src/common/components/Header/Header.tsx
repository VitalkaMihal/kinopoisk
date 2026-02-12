import React from 'react'
import styles from './Header.module.css'
import kinopoiskLogo from '@/assets/logo/kinopoisk-logo.svg'
import { useAppDispatch } from '@/common/hooks'
import { toggleTheme } from '@/features/themeSlice.ts'
import { Path } from '@/common/routing'
import { Link, useNavigate } from 'react-router-dom'
import { category, kinopoisk } from '@/common/constants'
import { changeSearchAC } from '@/app/appSlice.ts'

export const Header = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const navigateHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    navigate(`${kinopoisk.category}${category.POPULAR}`)
    window.scrollTo(0, 0)
  }

  const searghPageHandler = () => dispatch(changeSearchAC(''))

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <Link to={Path.Main}>
          <img src={kinopoiskLogo} alt="logo" className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <Link to={Path.Main} className={styles.link}>
            Main
          </Link>
          <Link to={Path.Category} onClick={(e) => navigateHandler(e)} className={styles.link}>
            Category Movies
          </Link>
          <Link to={Path.Filtered} className={styles.link}>
            Filtered Movies
          </Link>
          <Link to={Path.SearchPage} className={styles.link} onClick={searghPageHandler}>
            Search
          </Link>
          <Link to={Path.Favorites} className={styles.link}>
            Favorites
          </Link>
        </nav>
        <button
          onClick={() => {
            dispatch(toggleTheme())
          }}
          className={styles.button}
        >
          nite
        </button>
      </div>
    </div>
  )
}
