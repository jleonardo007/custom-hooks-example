import TimerDisplay from "./components/timer-display";
import TimerControls from "./components/timer-controls";
import useTimer from "./hooks/use-timer";
import beep from "./assets/beep.mp3";
import "./app.css";

export default function App() {
  const { timer, alarmRef, ...handlers } = useTimer();

  return (
    <>
      <section className="timer">
        <div className="timer-container">
          <TimerDisplay timer={timer} />
          <TimerControls timer={timer} handlers={handlers} />
        </div>
      </section>
      <audio ref={alarmRef} src={beep}></audio>
    </>
  );
}
