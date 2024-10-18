import FormProvider, {ContTextField} from "../components/hook-form";
import {Button, Card, IconButton, InputAdornment, Stack} from "@mui/material";
import {useState} from "react";
import * as Yup from "yup";
import {useSnackbar} from "../components/snackbar/snackbar-provider.tsx";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {PATH} from "../app-settings.ts";
import {useLoginMutation} from "../services/auth.service.ts";
import {LoginUserDto} from "../services/types.ts";
import BarChartIcon from "@mui/icons-material/BarChart";

const schema = Yup
  .object({
    name: Yup.string().required('Введи своё имя!').min(2, 'Минимум 2 символа!').max(10, 'Максимум 10 символов!').matches(/^[А-Яа-яЁё\s]+$/, {message: 'Используй кириллицу, без спецсимволов!'}),
    surname: Yup.string().required('Введи свою фамилию!').min(1, 'Минимум 1 символ!').max(15, 'Максимум 15 символов!').matches(/^[А-Яа-яЁё\s]+$/, {message: 'Используй кириллицу, без спецсимволов!'}),
    password: Yup.string().required('Введи свой пароль!').min(1, 'Минимум 1 символ!').max(15, 'Максимум 15 символов!'),
  })
  .required('Заполните поле!')

type FormData = Yup.InferType<typeof schema>


export const LoginPage = () => {
  const {showSnackbar} = useSnackbar();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [login] = useLoginMutation()

  const methods = useForm<FormData>(
    {
      defaultValues: {
        name: '',
        surname: '',
        password: '',
      },
      resolver: yupResolver(schema),
    });

  const {handleSubmit} = methods

  const onSubmit: SubmitHandler<LoginUserDto> = async data => {
    const newData = {
      name: data.name.trim().toLowerCase(),
      surname: data.surname.trim().toLowerCase(),
      password: data.password
    }

    const res = await login(newData)
    // if (res.error) {
    //   res.error.status === 401 ? showSnackbar('Похоже ты ввел некорректные данные 🧐', "error") : showSnackbar('Что-то сломалось 🤷🏻‍♀️', "error")
    // }

    if (res.error) {
      if ('status' in res.error) { // Проверка на статус
        if (res.error.status === 401) {
          showSnackbar('Похоже ты ввел некорректные данные 🧐', "error");
        } else {
          showSnackbar('Что-то сломалось 🤷🏻‍♀️', "error");
        }
      } else {
        showSnackbar('Что-то сломалось 🤷🏻‍♀️', "error"); // Обработка SerializedError
      }
    }

    const token = res.data!.accessToken;
    localStorage.setItem('token', token);
    navigate(PATH.index)
    showSnackbar(`Привет, ${data.name || 'Unknown'}! 😊`, "success");
  }

  const renderForm = (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <ContTextField name='name' label="Имя"/>
          <ContTextField name='surname' label="Фамилия"/>
          <ContTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position={'end'}>
                  <IconButton edge={'end'} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Пароль'
            name='password'
            type={showPassword ? 'text' : 'password'}
          />

          <Button type="submit" variant="contained" fullWidth>
            Войти
          </Button>
        </Stack>
      </FormProvider>
    </>
  )

  return (
    <Box>
      <Stack alignItems={'center'} justifyContent={'center'} sx={{height: 1}}>
        <Card
          sx={{
            maxWidth: 420,
            p: 5,
          }}
        >
          <Typography variant="h5">Войди в свой аккаунт</Typography>

          <Typography sx={{mb: 3, mt: 2}} variant='body2'>
            Нет аккаунта? Приди на ComeOn и получи его!
            <Link to={'https://t.me/+GEDqhNm9PKdhYmRi'} style={{marginLeft: '8px', color: 'blue'}}>Вопросы?</Link>
          </Typography>

          {renderForm}

          <Button variant='outlined' color='warning' onClick={() => navigate(PATH.players)} fullWidth sx={{mt:3}}>
            <BarChartIcon/>
            статистика игры
          </Button>
        </Card>
      </Stack>
    </Box>
  );
};