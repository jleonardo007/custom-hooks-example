import { useState, useEffect, useRef } from "react";
import TimerDisplay from "./components/timer-display";
import TimerControls from "./components/timer-controls";
import beep from "./assets/beep.mp3";
import "./app.css";

export default function App() {
  const initialState = {
    minutes: 1,
    seconds: 0,
    isPaused: true,
    reset: false,
  };
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

  return (
    <>
      <section className="timer">
        <div className="timer-container">
          <TimerDisplay timer={timer} alarmRef={alarmRef} />
          <TimerControls timer={timer} setTimer={setTimer} />
        </div>
      </section>
      <audio ref={alarmRef} src={beep}></audio>
    </>
  );
}
