import FormProvider, {ContTextField} from "../../components/hook-form";
import {Button, Card, CircularProgress, Stack} from "@mui/material";
import * as Yup from "yup";
import {useSnackbar} from "../../components/snackbar/snackbar-provider.tsx";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import {useCreateAnswerMutation, useGetQuestionsQuery, useGetQuizInfoQuery} from "../../services/quiz.service.ts";
import {Question, QuizInfo} from "../../services/types.ts";
import {useState} from "react";
import {useMeQuery} from "../../services/auth.service.ts";
import {PATH} from "../../app-settings.ts";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const schema = Yup
  .object({
    answer: Yup.string().required('Твой ответ').min(1).max(100, 'Твой ответ слишком большой!'),
  })
  .required('Заполните поле!')

type FormData = Yup.InferType<typeof schema>

export const Quiz = () => {
  const {showSnackbar} = useSnackbar();
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const {data} = useGetQuestionsQuery({})
  const questions = data as Question[]
  const {currentData} = useMeQuery()
  const userId = currentData?.id || 'no'
  const [createAnswer] = useCreateAnswerMutation()
  const {data: dataQuiz, isLoading: isInfoLoading} = useGetQuizInfoQuery({})
  if(isInfoLoading) {
    return <CircularProgress/>
  }
  const quizInfo = dataQuiz as QuizInfo


  const methods = useForm<FormData>(
    {
      defaultValues: {
        answer: '',
      },
      resolver: yupResolver(schema),
    });

  const {handleSubmit, reset} = methods

  const onSubmit: SubmitHandler<any> = async data => {
    showSnackbar(`Ты ответил: ${data.answer}`, 'info')

    const res = await createAnswer({
      userId,
      questionId: questions[currentQuestionIndex].id,
      answer: data.answer
    })

    if (res.error) {
      if ('status' in res.error && res.error.status === 400) {
        showSnackbar(`Ты уже ответил на этот вопрос! Этот ответ не будет засчитан 🤷🏻‍♀️`, "warning");
      } else {
        showSnackbar('Что-то сломалось 🤷🏻‍♀️', "error");
      }
    }

    setCurrentQuestionIndex(prevState => prevState + 1)
    reset()
  }

  if (!questions) {
    return <CircularProgress/>
  }

  return (
    <>
      <Stack alignItems={'center'} justifyContent={'center'} sx={{height: 1, mt: 3}}>
        <Typography variant="h5">Рождественский квиз ❄️</Typography>
        <Typography variant="body2" sx={{mb: 2}}>{quizInfo.bibleText}</Typography>
        <Card
          sx={{
            maxWidth: 420,
            p: 5,
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {
              questions[currentQuestionIndex]?.position ? (
                  <Stack spacing={3}>
                    <Typography
                      variant="h6">{`Вопрос ${questions[currentQuestionIndex].position} из ${questions.length}:`}</Typography>
                    <Typography variant="body1">{questions[currentQuestionIndex].question}</Typography>
                    <ContTextField name='answer' label="Твой ответ"/>
                    <div  style={{display:'flex', justifyContent: 'space-between' }}>
                      <Button type="submit" variant="contained" color='success'>
                        Ответить
                      </Button>

                      <Button variant="outlined" color='primary' aria-label={'back'} disabled={currentQuestionIndex === 0}
                              onClick={() => setCurrentQuestionIndex(prevState => prevState - 1)}>
                        <ArrowBackIosNewIcon/>
                      </Button>

                      <Button variant="outlined" color='primary' aria-label={'next'}
                              disabled={currentQuestionIndex === questions.length - 1}
                              onClick={() => setCurrentQuestionIndex(prevState => prevState + 1)}>
                        <ArrowForwardIosIcon/>
                      </Button>
                    </div>

                  </Stack>
                ) :
                (
                  <Stack spacing={3}>
                    <Typography variant="h6">{`Молодец, ты ответил на все вопросы!`}</Typography>
                    <Button variant="contained" fullWidth onClick={() => navigate(PATH.players)} color='warning'>
                      <BarChartIcon/>
                      Статистика
                    </Button>
                  </Stack>
                )
            }
          </FormProvider>
        </Card>
      </Stack>
    </>
  );
};
