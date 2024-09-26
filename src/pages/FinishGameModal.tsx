import BasicModal from "../components/modal/modal.tsx";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {Button, Card, CircularProgress, Fade} from "@mui/material";
import {memo, useState} from "react";
import {CONFIG} from "../app-settings.ts";
import Box from "@mui/material/Box";

function FinishGameModal({open, handleClose, name, surname, score, timeLeft, isSavingResults}: Props) {
  const [modalOpen, setModalOpen] = useState(open)

  const onHandleClose = () => {
    // setModalOpen(false)
    setModalOpen(true)
    handleClose()
  }

  return (
    <BasicModal open={modalOpen}>
      <Grid container spacing={2}>
        <Card sx={{width: '90%', maxWidth: 400, p: 2}}>

          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{textAlign: 'center'}}>
            {`${name} ${surname}`}
          </Typography>

          {timeLeft === 0 && <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            закончилось время 🤷🏻‍♀️
          </Typography>}

          <Typography id="modal-modal-description" sx={{mt: 2, textAlign: 'center'}}>
            {score === CONFIG.TOTAL_ELEMENTS ? `Ты нашел/нашла ВСЕ элементы на картинке 🎉 !`
              :
              `Ты нашел/нашла ${score} элементов на картинке!`
            }
          </Typography>

          {score > 0 && <Typography id="modal-modal-description" sx={{mt: 2, textAlign: 'center'}}>
            {`остаток времени: ${timeLeft} сек.!`}
          </Typography>}

          {isSavingResults ? (    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Fade
              in={isSavingResults}
              style={{
                transitionDelay: isSavingResults ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress/>
            </Fade>
          </Box>):
            <Button variant="contained" fullWidth sx={{mt: 2}} onClick={onHandleClose}>finish</Button>

          }
        </Card>
      </Grid>
    </BasicModal>
  )
}

export default memo(FinishGameModal)

type Props = {
  open: boolean
  handleClose: () => void
  name: string
  surname: string
  score: number
  timeLeft: number
  isSavingResults: boolean
}