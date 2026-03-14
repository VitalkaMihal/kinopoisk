import { baseApi } from '@/app/baseApi.ts'
import type { Search, Category, CreditsApi, MovieApi, PopularApi, SortAndFilterParams } from './kinopoiskApi.types.ts'

export const kinopoiskApi = baseApi.injectEndpoints({
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
  useLazyGetPopularQuery,
  useLazyGetSearchQuery,
  useLazyGetDetailsQuery,
  useGetCreditsQuery,
  useGetSimilarQuery,
  useGetSortAndFilterQuery,
} = kinopoiskApi
