import {baseApi} from "./base-api.ts";
import {LoginUserDto, User} from "./types.ts";

export const authService = baseApi.injectEndpoints!({
  endpoints: builder => ({
    login: builder.mutation<{ accessToken: string }, LoginUserDto>({
      query: (dto) => ({
        url: 'auth/login',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: [{type: 'Auth'}],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [{type: 'Auth'}, {type: 'Players'}, {type: 'Users'}],
    }),

    me: builder.query<User, void>({
      query: () => ({
        method: "GET",
        url: "auth/me",
      }),
      providesTags: [{type: 'Auth'}],
    })

  })
})

export const {
  useLoginMutation, useLogoutMutation, useMeQuery
} = authService;