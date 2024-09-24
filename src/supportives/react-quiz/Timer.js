import { useEffect } from "react"
export function Timer({secondsRemaining,dispatch}) {

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  // creating a side effect onMount. to start the timer
  useEffect(function(){
    const id = setInterval(function () {
      // console.log("timer");
        dispatch({type: "tick"});
      
    }, 1000);
    return function () {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div className="timer">
     {mins < 10 && "0"}{mins} :{secs < 10 && "0"}{secs}
    
    </div>
  );
}

