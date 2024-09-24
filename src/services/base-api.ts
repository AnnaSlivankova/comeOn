import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../app-settings.ts";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers
    }
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Players'],
})