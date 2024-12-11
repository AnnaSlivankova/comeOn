import {baseApi} from "./base-api.ts";
import {Answer, Question, QuizInfo, RightAnswers} from "./types.ts";

export const quizService = baseApi.injectEndpoints!({
  endpoints: builder => ({
    getQuestions: builder.query<Question[], void>({
      query: () => {
        return {
          method: "GET",
          url: "quiz/questions",
        };
      },
      providesTags: ['Questions'],
    }),

    getQuizInfo: builder.query<QuizInfo, void>({
      query: () => {
        return {
          method: "GET",
          url: "quiz/info",
        };
      },
      providesTags: ['QuizInfo'],
    }),

    getRightAnswers: builder.query<RightAnswers[], void>({
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
      }),

  })
})

export const {
  useGetQuestionsQuery, useCreateAnswerMutation, useGetQuizInfoQuery, useGetRightAnswersQuery
} = quizService;