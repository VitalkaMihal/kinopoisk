import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { errorToast, isErrorWithProperty } from '@/common/utils'

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
      switch (result.error.status) {
        case 404:
        case 401:
          if (isErrorWithProperty(result.error.data, 'status_message')) {
            errorToast(result.error.data.status_message)
          } else {
            errorToast(JSON.stringify(result.error.data))
          }
          break

        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
        case 'TIMEOUT_ERROR':
          errorToast(result.error.error)
          break

        default:
          if (result.error.status >= 500 && result.error.status < 600) {
            errorToast('Server error occurred. Please try again later.')
          } else {
            errorToast('Some error occurred')
          }
      }
    }

    return result
  },
  endpoints: () => ({}),
})
