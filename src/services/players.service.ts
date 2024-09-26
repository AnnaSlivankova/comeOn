import {baseApi} from "./base-api.ts";
import {CreatePlayerDto, Pagination, Player, QueryParams} from "./types.ts";

export const playersService = baseApi.injectEndpoints!({
  endpoints: builder => ({
    addPlayer: builder.mutation<Player, CreatePlayerDto>({
      query: (player) => ({
        url: 'game',
        method: 'POST',
        body: player,
      }),
      invalidatesTags: [{type: 'Players'}],
    }),

    ping: builder.query<boolean, void>({
      query: () => {
        return {
          method: "GET",
          url: "game/ping",
        }
      }
    }),

    getTopPlayersList: builder.query<Pagination<Player>, Partial<QueryParams>>({
      query: (params) => {
        return {
          method: "GET",
          url: "game",
          params
        };
      },
      providesTags: ['Players'],
    }),

  })
})

export const {
  useGetTopPlayersListQuery,
  useAddPlayerMutation,
  usePingQuery
} = playersService;