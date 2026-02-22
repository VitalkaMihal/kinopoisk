import { baseApi } from '@/app/baseApi.ts'
import type { CreditsApi, MovieApi, PopularApi, SortAndFilterParams } from '@/features/popular/api/popularApi.types.ts'
import type { categoryType } from '@/common/constants'

export const popularApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopular: build.query<PopularApi, categoryType>({
      query: (category) => ({
        url: `/movie/${category}`,
      }),
    }),
    getSearch: build.query<PopularApi, string>({
      query: (search) => ({
        url: `/search/movie`,
        params: {
          query: search,
        },
      }),
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
