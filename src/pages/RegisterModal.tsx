import {memo} from "react";
import BasicModal from "../components/modal/modal.tsx";
import Grid from "@mui/material/Grid2";
import {Button, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {CONFIG, PATH} from "../app-settings.ts";
import {useNavigate} from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";

function RegisterModal({open, handleClose}: Props) {
  const navigate = useNavigate()

  return (
    <BasicModal open={open}>
      <Grid container spacing={2}>
        <Box sx={{maxWidth: 400}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Найди все элементы 🔎🎁
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2, textAlign: 'center'}}>
            {`ЗАДАНИЕ: Найти как можно больше спрятанных элементов на картинке. Нашел то, что ищешь, тапай на это
              скорее. Чтобы начать игру - нажимай ИГРАТЬ. Кто найдет больше всех элементов (максимум ${CONFIG.TOTAL_ELEMENTS}), получит приз 🎁 на СomeONe. На поиски дается всего ${CONFIG.GAME_TIME} секунд⏱️, а за скорость начисляются дополнительные баллы. Торопись и удачи в поиске!`}
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

export default memo(RegisterModal)

type Props = {
  open: boolean
  handleClose: () => void
}