import { baseApi } from '@/app/baseApi.ts'
import type { PopularApi } from '@/features/popular/api/popularApi.types.ts'

export const popularApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopular: build.query<PopularApi, void>({
      query: () => ({
        url: '/movie/popular',
      }),
    }),
  }),
})

export const { useGetPopularQuery } = popularApi
