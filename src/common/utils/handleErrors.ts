import { errorToast, isErrorWithProperty } from '@/common/utils/index.ts'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    switch (error.status) {
      case 404:
      case 401:
        if (isErrorWithProperty(error.data, 'status_message')) {
          errorToast(error.data.status_message)
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
      case 'TIMEOUT_ERROR':
        errorToast(error.error)
        break

      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast('Server error occurred. Please try again later.')
        } else {
          errorToast('Some error occurred')
        }
    }
  }
}
