import { Header } from '@/common/components'
import { useAppSelector } from '@/common/hooks'
import type { RootState } from '@/app/store.ts'
import { Routing } from '@/common/routing'
import { Footer } from '@/common/components/Footer/Footer.tsx'

export const App = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme)

  const style = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    transition: '0.4s',
  }

  return (
    <div style={style}>
      <Header />
      <Routing />
      <Footer />
    </div>
  )
}
