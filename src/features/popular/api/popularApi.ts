import { baseApi } from '@/app/baseApi.ts'
import type { PopularApi } from '@/features/popular/api/popularApi.types.ts'
import type { categoryType } from '@/common/constants'

export const popularApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopular: build.query<PopularApi, categoryType>({
      query: (category) => ({
        url: `/movie/${category}`,
      }),
    }),
    getCategory: build.query<PopularApi, void>({
      query: () => ({
        url: '/movie/popular',
      }),
    }),
  }),
})

export const { useGetPopularQuery } = popularApi
