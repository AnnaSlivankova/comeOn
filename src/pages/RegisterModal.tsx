import {memo} from "react";
import * as Yup from "yup";
import {useSnackbar} from "../components/snackbar/snackbar-provider.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import BasicModal from "../components/modal/modal.tsx";
import FormProvider, {ContTextField} from "../components/hook-form";
import Grid from "@mui/material/Grid2";
import {Button, Card, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const schema = Yup
  .object({
    name: Yup.string().required('Введи своё имя!').matches(/^[А-Яа-яЁё]+$/, {message: 'Используй кириллицу, без спецсимволов и пробелов!'}),
    surname: Yup.string().required('Введи свою фамилию!').matches(/^[А-Яа-яЁё]+$/, {message: 'Используй кириллицу, без спецсимволов и пробелов!'}),
  })
  .required('Заполните поле!')

type FormData = Yup.InferType<typeof schema>

function RegisterModal({open, handleClose}:Props) {
  const {showSnackbar} = useSnackbar();

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
      <Card sx={{width: '90%', maxWidth: 400, p: 2}}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
          Найди все элементы 🔎🎁
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2, textAlign: 'center'}}>
          ЗАДАНИЕ: Найти как можно больше спрятанных элементов на картинке. Нашел то, что ищешь, тапай на это скорее. Для того чтобы начать игру, тебе необходимо
          ввести в поля ниже своё ИМЯ и ФАМИЛИЮ (на русском языке ☝🏻), а потом нажать кнопку ИГРАТЬ. На поиски дается всего 1 минута. Кто
          найдет больше всех элементов, получит приз. Торопись и удачи в поиске!
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
          </Box>
        </Stack>
      </Card>
    </Grid>
  </FormProvider>
</BasicModal>
  )
}

export default memo(RegisterModal)

type Props = {
  open:boolean
  handleClose: (name: string, surname: string) => void
}