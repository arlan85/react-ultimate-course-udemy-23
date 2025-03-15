import { createContext, useContext, useEffect, useReducer } from "react";
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

const QuizContext = createContext()
function QuizProvider({children}) {
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
 

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((result) => result.json())
      .then((resultData) => {
        dispatch({ type: "dataReceived", payload: resultData });
      })
      .catch((err) => {
        dispatch({ type: "dataFailed", payload: err.message });
      });
  }, []);

  const numQuestions= questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        error,
        answer,
        points,
        highscore,
        secondsTemaining,
        dispatch,
        totalPoints,
        numQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
  
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) throw new Error("QuizContext was used outside of QuizProvider")
  return context
}

export { QuizProvider, useQuiz };

