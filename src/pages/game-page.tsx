import Game from "./Game.tsx";
import {useState} from "react";
import RegisterModal from "./RegisterModal.tsx";
import {useAddPlayerMutation} from "../services/players.service.ts";
import {useMeQuery} from "../services/auth.service.ts";
import {useSnackbar} from "../components/snackbar/snackbar-provider.tsx";

export default function GamePage() {
  const {showSnackbar} = useSnackbar();
  const [createPlayer] = useAddPlayerMutation()
  const {currentData} = useMeQuery()
  const userId = currentData?.id || 'no'

  const [open, setOpen] = useState(true)
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false)
  const [playerId, setPlayerId] = useState<string | null>(null)


  const onHandleClose = async () => {
    const res = await createPlayer({userId})
    if (res.error) {
      showSnackbar(`Ты сыграл уже три раза, попробуй завтра!`, "warning");
      return;
    }

    setPlayerId(res.data.id)
    setOpen(false)
    setIsTimerStart(true)
  }

  return (
    <>
      <RegisterModal open={open} handleClose={onHandleClose}/>
      {playerId && isTimerStart && <Game isTimerStart={isTimerStart} playerId={playerId}/>}
    </>
  )
}