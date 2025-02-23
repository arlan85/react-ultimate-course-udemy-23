import { useEffect, useReducer } from "react";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  status: "loading", // loading, error, ready, active, finished
  questions: [],
  error: null,
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  secondsTemaining: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error", error: payload };
    case "start":
      return { ...state, status: "active", secondsTemaining: state.questions.length * SECS_PER_QUESTION  };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: payload,
        points:
          payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      console.log(state.points);
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsTemaining: state.secondsTemaining - 1,
        status: state.secondsTemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      status,
      questions,
      index,
      error,
      answer,
      points,
      highscore,
      secondsTemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((result) => result.json())
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
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsTemaining={secondsTemaining}
              ></Timer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
