export function setMinutes(e, setTimer) {
  setTimer((prevState) => {
    return {
      ...prevState,
      minutes: e.target.value,
    };
  });
}

export function playOrPauseTimer(setTimer) {
  setTimer((prevState) => {
    return {
      ...prevState,
      isPaused: !prevState.isPaused,
    };
  });
}

export function resetTimer(setTimer) {
  setTimer((prevState) => {
    return {
      ...prevState,
      reset: true,
    };
  });
}
