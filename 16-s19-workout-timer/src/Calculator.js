import { memo, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);
  
  //opt1 :memoize this to avoid the flicking issue
  /**
   * result opt 1:
   * So you saw that it basically reset our state. So very strange, very confusing probably. 
   * But again, it is actually for the exact same reason that earlier we heard the sound when we click here.
   * So the reason for that is once again, that whenever we click on that icon the allowSound state changes 
   * and so then the function is recreated. So then on that update, React sees a new function.
   * And since that function is here in the dependency array, it will run this effect again.
   * And so this effect will run with the current values of these four pieces of state. And so it will recalculate the duration based on that. Basically ignoring that earlier we had manually changed the duration with these buttons.
  */

  // const playSound = useCallback(function () {
  //   if (!allowSound) return;
  //   const sound = new Audio(clickSound);
  //   sound.play();
  // },[allowSound])

  // this is not the best practice to useEffect, must be one by state but in this case
  /** the calculation depends on all of this variables */
  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  }, [number, sets, speed, durationBreak]);

  /**
   * Now, the solution for this problem is to do something completely different.
     So instead of using useCallback here and instead of playing the sound here and here, we can do something entirely different. 
     Instead we just create one effect that is responsible for playing the sound.
   */

  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      };
      playSound();
    },
    [allowSound, duration] // So here we actually like voluntarily declared this duration variable in the dependency array,    
              // even though we are not using it anywhere here. So this is simply to tell the effect that we wanted to run whenever the duration changes.
  );

  /** So that was in the initial render. So a closure has been created here

at the time that this first render was created

and it closed over the props

and the state in the case of React. SNAPSHOT */
  useEffect(()=>{
    document.title= `Your ${number}-exercise workout`},
    []) //never recreates

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc() {
    setDuration((duration) => Math.floor(duration + 1));
  }

  function handleDec() {
    setDuration((duration) => (duration > 0 ? Math.floor(duration - 1) : 0));
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
