import { useEffect, useReducer } from "react";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Question from "./Question";
import StartScreen from "./StartScreen";

const initialState = {
  status: "loading", // loading, error, ready, active, finished
  questions: [],
  error: null,
  index: 0
};


function reducer(state, action) {
  const {type,  payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready"  };
    case "dataFailed":
      return { ...state, status: "error", error: payload };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ status, questions, index, error }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

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
        {status === "loading" && <Loader/>}
       {status === "error" && <Error/>}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
       {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}
