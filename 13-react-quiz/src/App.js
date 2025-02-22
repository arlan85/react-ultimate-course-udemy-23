import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  status: "loading", // loading, error, ready, active, finished
  questions: [],
  error: null,
};


function reducer(state, action) {
  const {type,  payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready"  };
    case "dataFailed":
      return { ...state, status: "error", error: payload };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, error } = state; 
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((result) =>  result.json())
      .then((resultData) => {
        dispatch({ type: "dataReceived", payload: resultData });
        // console.log(data);
      })
      .catch((err) => {
        dispatch({ type: "dataFailed", payload: err.message });
        // console.log(err.message);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>questions: {questions.length}</p>
        <p>Status: {status}</p>
       {error && <p>Error content:  {error}</p>}
      </Main>
    </div>
  );
}
