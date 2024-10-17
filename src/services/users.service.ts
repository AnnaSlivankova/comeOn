import {baseApi} from "./base-api.ts";
import {Pagination, QueryParams, User} from "./types.ts";

export const usersService = baseApi.injectEndpoints!({
  endpoints: builder => ({
    getUsersList: builder.query<Pagination<User>, Partial<QueryParams>>({
      query: (params) => {
        return {
          method: "GET",
          url: "/users",
          params
        };
      },
      providesTags: ['Users'],
    }),

    getUserById: builder.query<User, string>({
      query: (userId) => {
        return {
          method: "GET",
          url: `/users/${userId}`,
        };
      },
      providesTags: ['Users'],
    }),
  })
})

export const {
  useGetUsersListQuery,
  useGetUserByIdQuery
} = usersService;