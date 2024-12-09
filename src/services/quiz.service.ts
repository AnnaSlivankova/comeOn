import {baseApi} from "./base-api.ts";
import {Answer, Question, QuizInfo, RightAnswers} from "./types.ts";

export const quizService = baseApi.injectEndpoints!({
  endpoints: builder => ({
    //   addPlayer: builder.mutation<Player, CreatePlayerDto>({
    //     query: (player) => ({
    //       url: 'game',
    //       method: 'POST',
    //       body: player,
    //     }),
    //     invalidatesTags: [{type: 'Players'}],
    //   }),
    //
    //   updatePlayer: builder.mutation<Player, { id: string, data: UpdatePlayerDto }>({
    //     query: (data) => ({
    //       url: `game/${data.id}`,
    //       method: 'POST',
    //       body: data.data,
    //     }),
    //     invalidatesTags: [{type: 'Players'}],
    //   }),


    getQuestions: builder.query<Question[]>({
      query: () => {
        return {
          method: "GET",
          url: "quiz/questions",
        };
      },
      providesTags: ['Questions'],
    }),

    getQuizInfo: builder.query<QuizInfo>({
      query: () => {
        return {
          method: "GET",
          url: "quiz/info",
        };
      },
      providesTags: ['QuizInfo'],
    }),

    getRightAnswers: builder.query<RightAnswers[]>({
      query: () => {
        return {
          method: "GET",
          url: "quiz/right-answers",
        };
      },
      providesTags: ['RightAnswers'],
    }),

      createAnswer: builder.mutation<{answerId:string}, Answer>({
        query: (answer) => ({
          url: 'quiz/answer',
          method: 'POST',
          body: answer,
        }),
        // invalidatesTags: [{type: 'Players'}],
      }),

  })
})

export const {
  useGetQuestionsQuery, useCreateAnswerMutation, useGetQuizInfoQuery, useGetRightAnswersQuery
} = quizService;