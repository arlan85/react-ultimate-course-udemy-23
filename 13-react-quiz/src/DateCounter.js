import { useReducer } from "react";

function DateCounter() {
 
  const initialState = {
    count: 0,
    step: 1,
  }
  function reducerFunc(state, action) {
    console.log(state, action);
    const { type, payload } = action;
     
    switch (type) {
      case "inc":
        return {...state, count: state.count + state.step};
      case "dec":
        return {...state, count: state.count - state.step};
      case "setCount":
        return {...state, count: payload};
      case "setStep":
        return {...state, step: payload};
      case "reset":
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFunc, initialState); // this can be an object as initial state
  const {count, step} = state;
  // This mutates the date object.
  // const date = new Date("june 21 2027");
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec"}); // don't need payload because knows that is dec by 1
  };

  const inc = function () {
    dispatch({ type: "inc"});
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" })
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
