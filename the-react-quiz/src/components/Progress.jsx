import { useQuiz } from "../contexts/QuizContext"


export  function Progress() {
  const { index, points, answer,numQuestions,totalPoints} = useQuiz();

 

  return (
    <header className='progress'>
      <progress value={index + Number(answer !== null)} max={numQuestions}></progress>
     
      <p>
          Question <strong>{index + 1}</strong> /
          <strong>{numQuestions}</strong> 
        </p>
        <p>
          Points: <strong> {points}</strong>/ <strong>{totalPoints}</strong> 
        </p>
        
     
    </header>
  );
}


