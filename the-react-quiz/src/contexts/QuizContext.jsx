import { createContext, useContext, useEffect, useReducer } from "react"

const QUIZ_URL = "http://localhost:8000";
const QuizContext = createContext()

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready"};
    case "dataFailed":
      return {...state, status: "error"};
    case "startQuiz":
      return {...state, status: "active", secondsRemaining: state.questions.length*SECS_PER_QUESTION};
    case "newAnswer":
      const question = state.questions.at(state.index);
      // const isLastQuestion = state.index === state.questions.length - 1;
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
        };
    case "nextQuestion":
      return {...state, index: state.index + 1, answer: null};
    case "finished":
      return {...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore,
      secondsRemaining: 10
      };
    case "restartQuiz":
      return {...initialState, questions: state.questions, status: 'ready', highscore: state.highscore};
    case "tick":
      return {...state, secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining === 0 ? "finished" : state.status
      };
    default:
      throw new Error("");
      ;
  }
  
}
/*
statuses: "loading", "error", "ready","active","finished"
*/

function QuizProvider({ children }) {

  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);


  useEffect(function() {
    async function getQuestions() {
      try {
        const response = await fetch(`${QUIZ_URL}/questions`)
        const data = await response.json()
        dispatch({type: "dataReceived", payload: data})
      } catch (error) {
        dispatch({type: "dataFailed"})
      }
      
    }
     getQuestions()
    
  } , [dispatch])

  return (
    <QuizContext.Provider value={
      {questions, status, index, answer, points, highscore, secondsRemaining, dispatch, numQuestions, totalPoints}
    }>
      {children}
      
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}

export { QuizProvider, useQuiz }
