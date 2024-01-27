import { useEffect, useState } from 'react';

export default function Timer() {
  const [remainingTime, setRemainingTime] = useState(300); // 초 단위로 5분 설정

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const timerFunction = () => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime === 0) {
          clearInterval(intervalId);
        }

        return newTime;
      });
    };

    // 초기에도 한 번 실행
    timerFunction();

    // 1초 간격으로 함수 실행을 위한 타이머 설정
    intervalId = setInterval(timerFunction, 1000);

    // 컴포넌트가 언마운트될 때 타이머 해제
    return () => clearInterval(intervalId);
  }, []); // useEffect를 한 번만 실행하려면 빈 배열을 전달합니다.

  // 남은 시간을 표시하는 부분
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  return (
    <div>
      {`0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
    </div>
  );
}
