import { Footer, Header } from '@/common/components'
import { useAppSelector } from '@/common/hooks'
import { Routing } from '@/common/routing'
import s from './App.module.css'
import { selectTheme } from '@/app/appSlice.ts'
import { themeApp } from '@/common/constants'

export const App = () => {
  const theme = useAppSelector(selectTheme)
  const style = themeApp(theme)

  return (
    <div style={style as React.CSSProperties} className={s.wrapper}>
      <Header />
      <div className={s.content}>
        <Routing />
      </div>
      <Footer />
    </div>
  )
}
