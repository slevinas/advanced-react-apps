import { useEffect, useReducer } from "react"

// import DataCounter from "./supportives/react-quiz/DateCounter"

import {
  Error,
  FinishScreen,
  Footer,
  Header,
  Loader,
  Main,
  NextButton,
  Progress,
  Question,
  StartScreen,
  Timer
} from "./components"

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
export default function App() {

  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

  // derived state
  const numQuestions = questions.length;

  const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);

 
  

  useEffect(function () {
    fetch('http://localhost:8000/questions')
    .then((res)=>res.json())
    .then((data)=> dispatch({type: "dataReceived", payload: data}))
    .catch((err)=> dispatch({type: "dataFailed"}));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && ( <StartScreen
          numQuestions={numQuestions}
          dispatch={dispatch}
        />)}
       
        {status === "active" && (
           <>
           <Progress
             index={index}
             numQuestions={numQuestions}
             points={points}
             maxPossiblePoints={totalPoints}
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
               secondsRemaining={secondsRemaining}
             />
             <NextButton
               answer={answer}
               dispatch={dispatch}
               index={index}
               numQuestions={numQuestions}
             />
   
           </Footer>
          
           </>
        )}
       

        {status === "finished" && (
          <FinishScreen dispatch={dispatch} points={points} tot={totalPoints} 
          highscore={highscore}  />
        )}
         
        
      </Main>
    </div>
  );
}
