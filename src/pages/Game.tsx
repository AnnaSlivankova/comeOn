import {useState, useEffect, FC, useRef, memo} from 'react'
import {useSnackbar} from "../components/snackbar/snackbar-provider.tsx";
import Timer from "../components/timer.tsx";
import {useAddPlayerMutation} from "../services/players.service.ts";
import FinishGameModal from "./FinishGameModal.tsx";
import {CONFIG} from "../app-settings.ts";

const originalWidth = 1500 // оригинальная ширина
const originalHeight = 880 // оригинальная высота
const totalItems = CONFIG.TOTAL_ELEMENTS
const itemCoordinates = [
  {x: 411, y: 180, radius: 49}, // элемент 1
  {x: 482, y: 380, radius: 47}, // элемент 2
  {x: 325, y: 693, radius: 52}, // элемент 3
  {x: 502, y: 600, radius: 46}, // элемент 4
  {x: 727, y: 160, radius: 46}, // элемент 5
  {x: 710, y: 400, radius: 47}, // элемент 6
  {x: 947, y: 702, radius: 42}, // элемент 7
  {x: 1309, y: 657, radius: 42}, // элемент 8
  {x: 1251, y: 497, radius: 37}, // элемент 9
  {x: 1421, y: 412, radius: 32}, // элемент 10
  {x: 1228, y: 149, radius: 52}, // элемент 11
  {x: 973, y: 68, radius: 40}, // элемент 12
]

const Game: FC<Props> = ({name, surname}) => {
  console.log('render Game')
  // const navigate = useNavigate()
  // const [createPlayer, {isLoading, isError}] = useAddPlayerMutation()
  const [createPlayer] = useAddPlayerMutation()
  const {showSnackbar} = useSnackbar();
  const [startTimer, setStartTimer] = useState<boolean>(true)

  const [foundItems, setFoundItems] = useState<number[]>([])
  const [message, setMessage] = useState<string>('')
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
      setMessage('Поздравляем! Вы нашли все элементы!')
      // console.log(remainingTimeRef.current.toString())
      // console.log(remainingTimeRef)
      setOpenFinishModal(true)
      createPlayer({name, surname, score: foundItems.length, time: remainingTimeRef.current.toString()})
      console.log(`${name} ${surname} - ${foundItems.length} items`)
    }
  }, [foundItems])

  const handleImageClickCoords = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left // координата X
    const y = e.clientY - rect.top // координата Y

    // Проверяем, попали ли по одному из элементов
    // itemCoordinates.forEach((coord, index) => {
    scaledCoordinates.forEach((coord, index) => {
      const distance = Math.sqrt((x - coord.x) ** 2 + (y - coord.y) ** 2)

      if (distance <= coord.radius) {
        handleImageClick(index)
      }
    })
  }

  const handleTimeLeft = () => {
    console.log(`${name} ${surname} - ${foundItems.length} items`)
    setMessage(`Ты нашел ${foundItems.length}!`)
    // console.log(remainingTimeRef.current.toString())
    setOpenFinishModal(true)
    createPlayer({name, surname, score: foundItems.length, time: remainingTimeRef.current.toString()})
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h2>{`${name} ${surname} у тебя осталось ⏱️👇`}</h2>
      <Timer isActive={startTimer} onTimeLeft={handleTimeLeft} onTick={handleTick}/>
      {message && <h3>{message}</h3>}
      <div style={{position: 'relative', display: 'inline-block'}}>
        <img
          ref={imgRef}
          src="https://www.shutterstock.com/shutterstock/photos/2032541687/display_1500/stock-vector-children-are-playing-football-find-mismatch-find-artist-mistakes-find-rabbits-in-the-picture-2032541687.jpg" // Укажите путь к вашей картинке
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
              border: '2px solid rgba(255, 0, 0, 0.8)',
              borderRadius: '50%',
              pointerEvents: 'none',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
            }}
          />
        ))}
      </div>
      {openFinishModal &&
        <FinishGameModal open={openFinishModal} name={name} surname={surname} score={foundItems.length}
                         timeLeft={remainingTimeRef.current} handleClose={() => {
          console.log('send')
        }}/>}
    </div>
  )
}

export default memo(Game)

type Props = {
  name: string
  surname: string
}
