import { useState, useEffect, useRef } from "react";
import { setMinutes, playOrPauseTimer, resetTimer } from "../handlers/handlers";

const initialState = {
  minutes: 1,
  seconds: 0,
  isPaused: true,
  reset: false,
};

export default function useTimer() {
  const [timer, setTimer] = useState(initialState);
  const alarmRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (timer.isPaused) clearInterval(interval);
    else
      interval = setInterval(() => {
        setTimer((prevState) => {
          if (prevState.minutes === 0 && prevState.seconds === 0) {
            clearInterval(interval);
            return initialState;
          }

          if (prevState.seconds > 0 && prevState.seconds <= 59)
            return {
              ...prevState,
              seconds: prevState.seconds - 1,
            };
          else if (prevState.seconds === 0)
            return {
              ...prevState,
              minutes: prevState.minutes - 1,
              seconds: 59,
            };
        });
      }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (timer.minutes === 0 && timer.seconds === 0) alarmRef.current.play();
  });

  useEffect(() => {
    if (timer.reset)
      setTimer({
        minutes: 1,
        seconds: 0,
        isPaused: true,
        reset: false,
      });
  }, [timer.reset]);

  return {
    timer,
    alarmRef,
    setMinutes: (e) => setMinutes(e, setTimer),
    playOrPauseTimer: () => playOrPauseTimer(setTimer),
    resetTimer: () => resetTimer(setTimer),
  };
}
