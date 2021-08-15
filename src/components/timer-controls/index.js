import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faRedo, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

export default function TimerControls({ timer, setTimer }) {
  const { isPaused } = timer;

  function setMinutes(e) {
    if (timer.isPaused)
      setTimer((prevState) => {
        return {
          ...prevState,
          minutes: e.target.value,
        };
      });
  }

  function playOrPauseTimer() {
    setTimer((prevState) => {
      return {
        ...prevState,
        isPaused: !prevState.isPaused,
      };
    });
  }

  function resetTimer() {
    setTimer((prevState) => {
      return {
        ...prevState,
        reset: true,
      };
    });
  }

  return (
    <div className="timer-controls">
      <div className="minutes-input">
        <input
          type="number"
          min={1}
          value={timer.minutes}
          placeholder="Minutes"
          onChange={(e) => setMinutes(e)}
        />
      </div>
      <div className="timer-buttons">
        <button
          className="play-pause-button"
          onClick={playOrPauseTimer}
          title={isPaused ? "Init timer" : "Pause"}
        >
          {isPaused ? (
            <FontAwesomeIcon icon={faPlayCircle} />
          ) : (
            <FontAwesomeIcon icon={faPauseCircle} />
          )}
        </button>
        <button className="reset-button" onClick={resetTimer} title="Reset timer">
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </div>
  );
}
