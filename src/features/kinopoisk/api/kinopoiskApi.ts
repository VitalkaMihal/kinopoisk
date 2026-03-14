import { baseApi } from '@/app/baseApi.ts'
import type { Category, Search, SortAndFilterParams } from '@/common/types'
import { withZodCatch } from '@/common/utils'
import { CreditsApiSchema, MovieApiSchema, PopularApiSchema } from '@/features/kinopoisk/lib/schemas'

export const kinopoiskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopular: build.query({
      query: ({ category, pageNumber }: Category) => ({
        url: `/movie/${category}`,
        params: {
          page: pageNumber,
        },
      }),
      ...withZodCatch(PopularApiSchema),
    }),
    getSearch: build.query({
      query: ({ search, pageNumber }: Search) => ({
        url: `/search/movie`,
        params: {
          page: pageNumber,
          query: search,
        },
      }),
      providesTags: ['Search'],
      ...withZodCatch(PopularApiSchema),
    }),
    getSortAndFilter: build.query({
      query: (params: SortAndFilterParams) => ({
        url: `/discover/movie`,
        params: {
          ...params,
        },
      }),
      ...withZodCatch(PopularApiSchema),
    }),
    getDetails: build.query({
      query: (id: number) => ({
        url: `movie/${id}`,
      }),
      ...withZodCatch(MovieApiSchema),
    }),
    getCredits: build.query({
      query: (id: number) => ({
        url: `movie/${id}/credits`,
      }),
      ...withZodCatch(CreditsApiSchema),
    }),
    getSimilar: build.query({
      query: (id: number) => ({
        url: `movie/${id}/similar`,
      }),
      ...withZodCatch(PopularApiSchema),
    }),
  }),
})

export const {
  useGetPopularQuery,
  useLazyGetPopularQuery,
  useLazyGetSearchQuery,
  useLazyGetDetailsQuery,
  useGetCreditsQuery,
  useGetSimilarQuery,
  useGetSortAndFilterQuery,
} = kinopoiskApi
