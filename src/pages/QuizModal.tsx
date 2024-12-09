import {memo} from "react";
import BasicModal from "../components/modal/modal.tsx";
import Grid from "@mui/material/Grid2";
import {Button, CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {PATH} from "../app-settings.ts";
import {useNavigate} from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import {useGetQuizInfoQuery} from "../services/quiz.service.ts";
import {QuizInfo} from "../services/types.ts";

function QuizModal({open, handleClose}: Props) {
  const navigate = useNavigate()
  const {data, isLoading} = useGetQuizInfoQuery()
  if(isLoading) {
    return <CircularProgress/>
  }

  const quizInfo = data as QuizInfo

  return (
    <BasicModal open={open}>
      <Grid container spacing={2}>
        <Box sx={{maxWidth: 400}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Рождественский квиз ❄️
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2, textAlign: 'center'}}>
            {`💡 ЗАДАНИЕ: Найти и внимательно прочитать из заданного отрывка Библии о рождении Иисуса Христа. Ответить на вопросы по прочитанному отрывку (ссылка на `}
            <a href="https://bible.by/nrt/" target="_blank" rel="noopener noreferrer">Библию</a>
            {`).`}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 1, textAlign: 'center'}}>
            {`📖 ОТРЫВОК: ${quizInfo.bibleText}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 1, textAlign: 'center'}} variant={'body2'}>
            ❗️ Дается вего ОДНА попытка для ответа. Вопросы можно пропускать, а потом вернуться и ответить на пропущенные. На каждый круг вопросов отведено определенное время, ТАЙМЕР сообщает сколько остается времени до конца круга, в которое ты можешь отправить свои ответы.</Typography>
          <Typography id="modal-modal-description" sx={{mt: 1, textAlign: 'center'}} variant={'body2'}>
            {`‼️ Баллы будут начисляться за точность и скорость ответа, а правильно ли ты ответил и сколько баллов набрал, сможешь проверить на следующий день в СТАТИСТИКА ИГРЫ`}
          </Typography>
          <Stack spacing={3} sx={{p: 3}}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
              sx={{mt: 1}}
            >

              <Button variant="contained" onClick={() => handleClose()}>
                Играть
              </Button>
              <Button variant='outlined' color='warning' onClick={() => navigate(PATH.players)}>
                <BarChartIcon/>
                статистика игры
              </Button>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </BasicModal>
  )
}

export default memo(QuizModal)

type Props = {
  open: boolean
  handleClose: () => void
}