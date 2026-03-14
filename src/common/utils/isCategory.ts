import type { categoryType } from '@/common/types'

export const isCategory = (data: string): data is categoryType => {
  return data === 'now_playing' || data === 'popular' || data === 'top_rated' || data === 'upcoming'
}
