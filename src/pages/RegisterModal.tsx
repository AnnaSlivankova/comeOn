import {memo} from "react";
import * as Yup from "yup";
import {useSnackbar} from "../components/snackbar/snackbar-provider.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import BasicModal from "../components/modal/modal.tsx";
import FormProvider, {ContTextField} from "../components/hook-form";
import Grid from "@mui/material/Grid2";
import {Button, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {PATH} from "../app-settings.ts";
import {useNavigate} from "react-router-dom";

const schema = Yup
  .object({
    name: Yup.string().required('Введи своё имя!').min(2, 'Минимум 2 символа!').max(10, 'Максимум 10 символов!').matches(/^[А-Яа-яЁё\s]+$/, {message: 'Используй кириллицу, без спецсимволов!'}),
    surname: Yup.string().required('Введи свою фамилию!').min(1, 'Минимум 1 символ!').max(15, 'Максимум 15 символов!').matches(/^[А-Яа-яЁё\s]+$/, {message: 'Используй кириллицу, без спецсимволов!'}),
  })
  .required('Заполните поле!')

type FormData = Yup.InferType<typeof schema>

function RegisterModal({open, handleClose}: Props) {
  const {showSnackbar} = useSnackbar();
  const navigate = useNavigate()

  const methods = useForm<FormData>(
    {
      defaultValues: {
        name: '',
        surname: '',
      },
      resolver: yupResolver(schema),
    });

  const {handleSubmit} = methods

  const onSubmit: SubmitHandler<any> = data => {
    showSnackbar(`${data.name} ${data.surname} - погнали! 🤪`, "success");
    handleClose(data.name, data.surname)
  }

  return (
    <BasicModal open={open}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Box sx={{maxWidth: 400}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
              Найди все элементы 🔎🎁
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2, textAlign: 'center'}}>
              ЗАДАНИЕ: Найти как можно больше спрятанных элементов на картинке. Нашел то, что ищешь, тапай на это
              скорее. Чтобы начать игру, тебе необходимо ввести в поля ниже своё ИМЯ и ФАМИЛИЮ (на русском языке ☝🏻) и затем нажать кнопку ИГРАТЬ. Кто
              найдет больше всех элементов (максимум 12), получит приз 🎁 в эту субботу на СomeONe. На поиски дается всего 30 секунд⏱️, а за скорость начисляются дополнительные баллы. Торопись и удачи в поиске!
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

                <ContTextField name='name' label="Имя"/>
                <ContTextField name='surname' label="Фамилия"/>
                <Button type="submit" variant="contained">
                  Играть
                </Button>
                <Button variant='outlined' color='warning' onClick={() => navigate(PATH.players)}>
                  Статистика игроков
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </FormProvider>
    </BasicModal>
  )
}

export default memo(RegisterModal)

type Props = {
  open: boolean
  handleClose: (name: string, surname: string) => void
}