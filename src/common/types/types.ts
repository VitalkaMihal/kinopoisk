import { z } from 'zod'
import {
  CategorySchema,
  categoryTypeSchema,
  GenresSchema,
  SearchSchema,
  SortAndFilterParamsSchema,
} from '@/features/kinopoisk/lib/schemas'

export type categoryType = z.infer<typeof categoryTypeSchema>
export type Genres = z.infer<typeof GenresSchema>
export type SortAndFilterParams = z.infer<typeof SortAndFilterParamsSchema>
export type Category = z.infer<typeof CategorySchema>
export type Search = z.infer<typeof SearchSchema>
