// import { useEffect, useReducer } from "react"

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
import { useQuiz } from "./contexts/QuizContext"


export default function App() {
  const { status} = useQuiz();


  return (
    <div className="app">
      <Header />

      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && ( <StartScreen
         
        />)}
       
        {status === "active" && (
           <>
           <Progress />
           <Question />
           <Footer>
             <Timer />
             <NextButton />
   
           </Footer>
          
           </>
        )}
       

        {status === "finished" && (
          <FinishScreen  />
        )}
         
        
      </Main>
    </div>
  );
}
