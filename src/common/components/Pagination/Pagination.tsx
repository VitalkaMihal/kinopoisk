import { getPaginationPages } from '@/common/utils'
import s from './Pagination.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectTheme } from '@/app/appSlice.ts'
import { themeApp } from '@/common/constants'
import React from 'react'

type Props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  pagesCount: number
}

export const Pagination = ({ currentPage, setCurrentPage, pagesCount }: Props) => {
  const theme = useAppSelector(selectTheme)
  const style = themeApp(theme)
  if (pagesCount <= 1) return

  const pages = getPaginationPages(currentPage, pagesCount)

  return (
    <div style={style as React.CSSProperties} className={s.container}>
      <div className={s.pagination}>
        {pages.map((page, idx) =>
          page === '...' ? (
            <span className={s.ellipsis} key={`ellipsis-${idx}`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
              onClick={() => page !== currentPage && setCurrentPage(Number(page))}
              disabled={page === currentPage}
              type="button"
            >
              {page}
            </button>
          ),
        )}
      </div>
    </div>
  )
}
