import s from './Footer.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectTheme } from '@/app/appSlice.ts'
import { themeApp } from '@/common/constants'
import React from 'react'

export const Footer = () => {
  const theme = useAppSelector(selectTheme)
  const style = themeApp(theme)

  return (
    <footer style={style as React.CSSProperties} className={s.footer}>
      <div className={s.container}>© 2025 Kinopoisk Demo · Data courtesy of TMDB.</div>
    </footer>
  )
}
