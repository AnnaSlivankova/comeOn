import {baseApi} from "./base-api.ts";
import {CreatePlayerDto, Pagination, Player, QueryParams, UpdatePlayerDto} from "./types.ts";

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

    updatePlayer: builder.mutation<Player, { id: string, data: UpdatePlayerDto }>({
      query: (data) => ({
        url: `game/${data.id}`,
        method: 'POST',
        body: data.data,
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
  useUpdatePlayerMutation
} = playersService;