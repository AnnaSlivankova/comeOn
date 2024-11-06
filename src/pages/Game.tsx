import {FC, memo, MouseEvent, useEffect, useRef, useState} from 'react'
import {useSnackbar} from "../components/snackbar/snackbar-provider.tsx";
import Timer from "../components/timer.tsx";
import {useUpdatePlayerMutation} from "../services/players.service.ts";
import FinishGameModal from "./FinishGameModal.tsx";
import {CONFIG, PATH} from "../app-settings.ts";
import {useNavigate} from "react-router-dom";
import gameImage from '../assets/game-images/game3.jpg';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import {useMeQuery} from "../services/auth.service.ts";


let originalWidth: number
let originalHeight: number

const img = new Image()
img.onload = () => {
  const width = img.width;
  const height = img.height;

  originalWidth = width
  originalHeight = height
  console.log(`Width: ${width}, Height: ${height}`);
}
img.src = gameImage as string

const totalItems = CONFIG.TOTAL_ELEMENTS

const itemCoordinates = [
  {x: 915, y: 600, radius: 39, title: "showel"},
  {x: 63, y: 794, radius: 53, title: "bucket"},
  {x: 100, y: 589, radius: 46, title: "ladder"},
  {x: 732, y: 286, radius: 44, title: "hat"},
  {x: 603, y: 1066, radius: 33, title: "shuttlecock"},
  {x: 997, y: 153, radius: 35, title: "glasses"},
  {x: 383, y: 466, radius: 45, title: "bag"},
  {x: 1033, y: 897, radius: 36, title: "pencil"},
  {x: 1364, y: 733, radius: 56, title: "bailer"},
];

const Game: FC<Props> = ({isTimerStart, playerId}) => {
  console.log('render Game')
  const {currentData} = useMeQuery()
  const userId = currentData?.id || 'no'
  const name = currentData?.name || 'no'
  const surname = currentData?.surname || 'no'

  const navigate = useNavigate()
  const [updatePlayer, {isLoading}] = useUpdatePlayerMutation()
  const {showSnackbar} = useSnackbar();

  const [startTimer, setStartTimer] = useState<boolean>(isTimerStart)
  const [foundItems, setFoundItems] = useState<number[]>([])
  const [scaledCoordinates, setScaledCoordinates] = useState<any[]>([])
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [openFinishModal, setOpenFinishModal] = useState(false)

  const remainingTimeRef = useRef<number>(0);
  const handleTick = (timeLeft: number) => {
    remainingTimeRef.current = timeLeft;
  };

  const updateCoordinates = () => {
    if (imgRef.current) {
      const {width, height} = imgRef.current!.getBoundingClientRect()

      const scaleX = width / originalWidth
      const scaleY = height / originalHeight

      const newCoordinates = itemCoordinates.map(coord => ({
        x: coord.x * scaleX,
        y: coord.y * scaleY,
        radius: coord.radius * scaleX, // радиус также масштабируется
      }))

      setScaledCoordinates(newCoordinates)
    }
  }

  useEffect(() => {
    updateCoordinates() // Начальный расчет координат
    window.addEventListener('resize', updateCoordinates) // Обработчик изменения размера
    return () => {
      window.removeEventListener('resize', updateCoordinates) // Очистка обработчика
    }
  }, [])

  const handleImageLoad = () => {
    updateCoordinates() // Обновляем координаты после загрузки изображения
  }

  const handleImageClick = (index: number) => {
    if (!foundItems.includes(index)) {
      setFoundItems([...foundItems, index])
    }
  }

  useEffect(() => {
    if (foundItems.length === totalItems) {
      showSnackbar('УРА! Все элементы найдены!', "success")
      setStartTimer(false)
      updatePlayer({id: playerId, data: {score: foundItems.length, time: remainingTimeRef.current, userId: userId}})
      setOpenFinishModal(true)
    }
  }, [foundItems])

  const handleImageClickCoords = (e: MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left // координата X
    const y = e.clientY - rect.top // координата Y

    // Проверяем, попали ли по одному из элементов
    scaledCoordinates.forEach((coord, index) => {
      const distance = Math.sqrt((x - coord.x) ** 2 + (y - coord.y) ** 2)

      if (distance <= coord.radius) {
        handleImageClick(index)
      }
    })
  }

  const handleTimeLeft = () => {
    updatePlayer({id: playerId, data: {score: foundItems.length, time: remainingTimeRef.current, userId: userId}})
    setOpenFinishModal(true)
  }

  return (
    <Box>
      <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
        <Typography variant="h6">Найди все необходимые элементы</Typography>
        <Typography variant="h6" sx={{fontWeight: 300}}>{`${name} ${surname} у тебя осталось ⏱️👇`}</Typography>
        <Timer isActive={startTimer} onTimeLeft={handleTimeLeft} onTick={handleTick}/>
        <div style={{position: 'relative', display: 'inline-block'}}>
          <img
            ref={imgRef}
            src={gameImage as string}
            alt="Game"
            onLoad={handleImageLoad}
            style={{width: '100%', maxWidth: '800px'}}
            onClick={handleImageClickCoords}
          />
          {foundItems.map(index => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${scaledCoordinates[index].x - scaledCoordinates[index].radius}px`,
                top: `${scaledCoordinates[index].y - scaledCoordinates[index].radius}px`,
                width: `${scaledCoordinates[index].radius * 2}px`,
                height: `${scaledCoordinates[index].radius * 2}px`,
                border: '1px solid rgba(255, 0, 0, 0.8)',
                borderRadius: '50%',
                pointerEvents: 'none',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
              }}
            />
          ))}
        </div>
        {openFinishModal &&
          <FinishGameModal
            open={openFinishModal}
            name={name}
            surname={surname}
            score={foundItems.length}
            isSavingResults={isLoading}
            timeLeft={remainingTimeRef.current} handleClose={() => {
            navigate(PATH.players)
          }}/>}
      </Stack>
    </Box>
  )
}

export default memo(Game)

type Props = {
  isTimerStart: boolean
  playerId: string
}
