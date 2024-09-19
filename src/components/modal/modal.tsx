import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {memo} from 'react';
import FormProvider, {ContTextField} from "../hook-form";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {SubmitHandler, useForm} from "react-hook-form";
import {useSnackbar} from "../snackbar/snackbar-provider.tsx";
import {Button, Card, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';

const schema = Yup
  .object({
    name: Yup.string().required('Введи своё имя!'),
    surname: Yup.string().required('Введи свою фамилию!'),
  })
  .required('Заполните поле!')

type FormData = Yup.InferType<typeof schema>

function BasicModal({open, handleClose}: { open: boolean, handleClose: (name: string, surname: string) => void }) {
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
    console.log('data', data)
    showSnackbar(`${data.name} ${data.surname} - погнали! 🤪`, "success");
    handleClose(data.name, data.surname)
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Card sx={{width: '90%', maxWidth: 400, p: 2}}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                Найди всех кроликов 🐰
              </Typography>
              <Typography id="modal-modal-description" sx={{mt: 2, textAlign: 'center'}}>
                ЗАДАНИЕ: Найти как можно больше кроликов 🐰 на картинке. Нашел кролика, нажимай на него. Для того чтобы начать игру, тебе необходимо
                ввести в поля ниже своё ИМЯ и ФАМИЛИЮ, а потом нажать кнопку ИГРАТЬ. На поиски дается всего 5 минут. Кто
                найдет всех 🐰получит приз, торопись и удачи!
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
      </Modal>
    </Box>
  );
}

export default memo(BasicModal)

