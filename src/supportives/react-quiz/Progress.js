export  function Progress({index, numQuestions, points, maxPossiblePoints, answer}) {
  return (
    <header className='progress'>
      <progress value={index + Number(answer !== null)} max={numQuestions}></progress>
     
      <p>
          Question <strong>{index + 1}</strong> /
          <strong>{numQuestions}</strong> 
        </p>
        <p>
          Points: <strong> {points}</strong>/ <strong>{maxPossiblePoints}</strong> 
        </p>
        
     
    </header>
  );
}


