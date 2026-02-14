import { baseApi } from '@/app/baseApi.ts'
import type { MovieApi, PopularApi } from '@/features/popular/api/popularApi.types.ts'
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
    getDetails: build.query<MovieApi, number>({
      query: (id) => ({
        url: `movie/${id}`,
      }),
    }),
  }),
})

export const { useGetPopularQuery, useLazyGetSearchQuery, useGetDetailsQuery } = popularApi
