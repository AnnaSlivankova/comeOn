import {FC, useEffect, useState} from 'react';
import {CONFIG} from "../app-settings.ts";

const Timer: FC<Props> = ({isActive, onTimeLeft, onTick}) => {
  const [timeLeft, setTimeLeft] = useState(CONFIG.GAME_TIME);

  useEffect(() => {
    let timer: number;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        onTick(timeLeft - 1)
      }, 1000);
    }

    if (timeLeft === 0) {
      onTimeLeft()
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
      <h2>
        {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </h2>
  );
};

export default Timer;

type Props = {
  isActive: boolean
  onTimeLeft: () => void
  onTick: (timeLeft: number) => void
}