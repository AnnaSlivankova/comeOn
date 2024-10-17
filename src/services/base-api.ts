import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../app-settings.ts";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accToken = localStorage.getItem('token')
      if(accToken) {
        headers.set('Authorization', `Bearer ${accToken}`)
      }
      headers.set('Content-Type', 'application/json');
      return headers
    }
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Players', 'Auth', 'Users'],
})