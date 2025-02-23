import PropTypes from 'prop-types';
import { useEffect } from "react";

function Timer({dispatch, secondsTemaining}) {
  const minutes = Math.floor(secondsTemaining / 60);
  const seconds = secondsTemaining % 60;
  useEffect(() => {
    if (secondsTemaining === 0) {
      dispatch({type: "finished"})
    }
  }, [dispatch, secondsTemaining])
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({type: "tick"})
    }, 1000)
    return () => clearInterval(id)  
  }, [dispatch])
  return (
    <div className="timer">
      {minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}
    </div>
  )
}
Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Timer
