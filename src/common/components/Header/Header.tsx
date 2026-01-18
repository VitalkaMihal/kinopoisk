import styles from './Header.module.css'
import kinopoiskLogo from '@/assets/logo/kinopoisk-logo.svg'
import { useAppDispatch } from '@/common/hooks'
import { toggleTheme } from '@/features/themeSlice.ts'

export const Header = () => {
  const dispatch = useAppDispatch()
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <img src={kinopoiskLogo} alt="logo" className={styles.logo} />
        <nav className={styles.nav}>
          <span>Main</span>
          <span>Category</span>
          <span>Movies</span>
          <span>Filtered</span>
          <span>Movies Search</span>
          <span>Favorites</span>
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
