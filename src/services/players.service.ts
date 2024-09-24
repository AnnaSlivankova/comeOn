import {baseApi} from "./base-api.ts";

export const playersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    // getAllPlayers: builder.query<any[], void>({
    //   query: () => 'game',
    //   providesTags: (result) =>
    //     result ? [...result.map(({id}) => ({type: 'Players', id} as const)), {
    //       type: 'Players',
    //       id: 'LIST'
    //     }] : [{type: 'Players', id: 'LIST'}],
    // }),

    addPlayer: builder.mutation<any, Partial<any>>({
      query: (player) => ({
        url: 'game',
        method: 'POST',
        body: player,
      }),
      invalidatesTags: [{type: 'Players', id: 'LIST'}],
    }),

    ping: builder.query<boolean, void>({
      query: (query: any) => {
        return {
          method: "GET",
          url: "game/ping",
          query: query
        }
      }
    }),


    getTopPlayersList: builder.query<any, any>({
      query: () => {
        return {
          method: "GET",
          url: "game",
        };
      },
      providesTags: ['Players'],
    }),

    // createPlayer: builder.mutation<any, any>({
    //   query(body) {
    //     return {
    //       url: `game`,
    //       method: 'POST',
    //       body,
    //     }
    //   },
    //   invalidatesTags: ['Players'],
    // }),

  })
})

export const {
  useGetTopPlayersListQuery,
  useAddPlayerMutation,
  usePingQuery
} = playersService;