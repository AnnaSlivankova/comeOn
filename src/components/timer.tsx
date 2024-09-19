import {FC, useEffect, useState} from 'react';

type Props = {
  isActive: boolean
}

const Timer: FC<Props> = ({isActive}) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 минут в секундах
  // const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <h2>
        {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </h2>
      {timeLeft === 0 && <p>Время вышло!</p>}
    </>
  );
};

export default Timer;