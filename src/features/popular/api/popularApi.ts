import { baseApi } from '@/app/baseApi.ts'
import type { CreditsApi, MovieApi, PopularApi, SortAndFilterParams } from '@/features/popular/api/popularApi.types.ts'
import { type categoryType } from '@/common/constants'

type Category = {
  category: categoryType
  pageNumber: number
}

type Search = {
  search: string
  pageNumber: number
}

export const popularApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopular: build.query<PopularApi, Category>({
      query: ({ category, pageNumber }) => ({
        url: `/movie/${category}`,
        params: {
          page: pageNumber,
        },
      }),
    }),
    getSearch: build.query<PopularApi, Search>({
      query: ({ search, pageNumber }) => ({
        url: `/search/movie`,
        params: {
          page: pageNumber,
          query: search,
        },
      }),
      providesTags: ['Search'],
    }),
    getSortAndFilter: build.query<PopularApi, SortAndFilterParams>({
      query: (params) => ({
        url: `/discover/movie`,
        params: {
          ...params,
        },
      }),
    }),
    getDetails: build.query<MovieApi, number>({
      query: (id) => ({
        url: `movie/${id}`,
      }),
    }),
    getCredits: build.query<CreditsApi, number>({
      query: (id) => ({
        url: `movie/${id}/credits`,
      }),
    }),
    getSimilar: build.query<PopularApi, number>({
      query: (id) => ({
        url: `movie/${id}/similar`,
      }),
    }),
  }),
})

export const {
  useGetPopularQuery,
  useLazyGetSearchQuery,
  useGetDetailsQuery,
  useGetCreditsQuery,
  useGetSimilarQuery,
  useGetSortAndFilterQuery,
} = popularApi
