import { useEffect, useState } from "react"
import { useQuiz } from "../contexts/QuizContext"

export function Timer() {

  const {secondsRemaining, dispatch} = useQuiz();
  const [timer, setTimer] = useState(secondsRemaining);


  const mins = Math.floor(timer / 60);
  const secs = timer % 60;
  // creating a side effect onMount. to start the timer
  useEffect(function(){
    const id = setInterval(
      function () {
        // console.log("timer");
        // dispatch({type: "tick"});
        if (timer > 0) {
          console.log('from timer, tick');
         
          setTimer(timer => timer - 1);
          
        }
        if (timer === 0) {
          console.log('from timer, finished');
          dispatch({type: "finished"});
        }
      }, 1000);
    return function () {
      clearInterval(id);
    };
  }, [dispatch, timer]);

  return (
    <div className="timer">
     
     {mins < 10 && "0"}{mins} :{secs < 10 && "0"}{secs}
    
    </div>
  );
}
