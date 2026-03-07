import styles from './PageNotFound.module.css'
import { Path } from '@/common/routing'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>page not found</h2>
      <Link className={styles.link} to={Path.Main}>
        Вернуться на главную
      </Link>
    </div>
  )
}
