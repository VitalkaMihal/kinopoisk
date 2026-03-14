import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleErrors } from '@/common/utils'

export const baseApi = createApi({
  reducerPath: 'kinopoiskApi',
  tagTypes: ['Search', 'Popular'],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    })(args, api, extraOptions)

    if (result.error) {
      handleErrors(result.error)
    }

    return result
  },
  endpoints: () => ({}),
})
