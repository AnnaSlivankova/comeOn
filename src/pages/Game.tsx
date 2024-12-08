import {FC, memo, MouseEvent, useEffect, useRef, useState} from 'react'
import {useSnackbar} from "../components/snackbar/snackbar-provider.tsx";
import Timer from "../components/timer.tsx";
import {useUpdatePlayerMutation} from "../services/players.service.ts";
import FinishGameModal from "./FinishGameModal.tsx";
import {CONFIG, PATH} from "../app-settings.ts";
import {useNavigate} from "react-router-dom";
import gameImage from '../assets/game-images/game4.jpg';
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

// const itemCoordinates = [
//   {x: 915, y: 600, radius: 39, title: "showel"},
//   {x: 63, y: 794, radius: 53, title: "bucket"},
//   {x: 100, y: 589, radius: 46, title: "ladder"},
//   {x: 732, y: 286, radius: 44, title: "hat"},
//   {x: 603, y: 1066, radius: 33, title: "shuttlecock"},
//   {x: 997, y: 153, radius: 35, title: "glasses"},
//   {x: 383, y: 466, radius: 45, title: "bag"},
//   {x: 1033, y: 897, radius: 36, title: "pencil"},
//   {x: 1364, y: 733, radius: 56, title: "bailer"},
// ];

const itemCoordinates = [
  { x: 140, y: 528, radius: 87, title: "sf1" },
  { x: 1502, y: 457, radius: 94, title: "sf3" },
  { x: 1611, y: 251, radius: 89, title: "sf4" },
  { x: 2891, y: 258, radius: 89, title: "sf5" },
  { x: 3711, y: 408, radius: 88, title: "sf6" },
  { x: 2102, y: 1065, radius: 78, title: "sf7" },
  { x: 1841, y: 1567, radius: 81, title: "sf8" },
  { x: 120, y: 1532, radius: 71, title: "sf2" },
  { x: 539, y: 1460, radius: 69, title: "cat1" },
  { x: 2453, y: 1160, radius: 69, title: "cat2" },
  { x: 3476, y: 1564, radius: 48, title: "yb1" },
  { x: 468, y: 1580, radius: 48, title: "yb2" },
  { x: 1600, y: 1557, radius: 44, title: "yb3" },
  { x: 2716, y: 1288, radius: 50, title: "yb4" },
  { x: 2415, y: 398, radius: 47, title: "yb5" },
  { x: 2043, y: 1310, radius: 44, title: "yb6" },
  { x: 1185, y: 695, radius: 49, title: "yb7" },
  { x: 1453, y: 1005, radius: 49, title: "yb8" },
  { x: 369, y: 1118, radius: 53, title: "yb9" },
  { x: 1259, y: 1223, radius: 144, title: "ladder" },
  { x: 1067, y: 1415, radius: 84, title: "bow1" },
  { x: 799, y: 1399, radius: 72, title: "bow2" },
  { x: 2899, y: 815, radius: 64, title: "bow3" },
  { x: 1566, y: 722, radius: 77, title: "bow4" },
  { x: 2013, y: 1441, radius: 65, title: "bow5" },
  { x: 964, y: 1608, radius: 55, title: "rb1" },
  { x: 595, y: 1095, radius: 49, title: "rb2" },
  { x: 914, y: 714, radius: 51, title: "rb3" },
  { x: 1312, y: 1458, radius: 54, title: "rb4" },
  { x: 2147, y: 1369, radius: 42, title: "rb5" },
  { x: 2696, y: 1578, radius: 44, title: "rb6" },
  { x: 3451, y: 1384, radius: 57, title: "rb7" },
  { x: 2724, y: 301, radius: 48, title: "rb8" },
  { x: 2612, y: 1107, radius: 45, title: "rb9" },
  { x: 2810, y: 1010, radius: 39, title: "rb10" },
  { x: 743, y: 180, radius: 98, title: "star1" },
  { x: 830, y: 543, radius: 83, title: "star2" },
  { x: 636, y: 412, radius: 73, title: "star3" },
  { x: 526, y: 797, radius: 75, title: "star4" },
  { x: 817, y: 921, radius: 75, title: "star5" },
  { x: 726, y: 1110, radius: 60, title: "star6" },
  { x: 3103, y: 1357, radius: 69, title: "star7" },
  { x: 3614, y: 1618, radius: 80, title: "box1" },
  { x: 2760, y: 1131, radius: 72, title: "box2" },
  { x: 2162, y: 1220, radius: 64, title: "box3" },
  { x: 360, y: 1230, radius: 49, title: "box4" },
  { x: 1122, y: 793, radius: 56, title: "box5" },
  { x: 1683, y: 1357, radius: 76, title: "box6" },
  { x: 2783, y: 874, radius: 58, title: "man1" },
  { x: 1800, y: 308, radius: 84, title: "man2" },
  { x: 723, y: 1584, radius: 70, title: "man3" },
  { x: 1736, y: 669, radius: 66, title: "socks1" },
  { x: 1890, y: 699, radius: 61, title: "socks2" },
  { x: 2517, y: 709, radius: 64, title: "socks3" },
  { x: 2684, y: 678, radius: 76, title: "socks4" },
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
        <Typography variant="body1">❗️ Банты могут быть любыми, пробуй!</Typography>
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
