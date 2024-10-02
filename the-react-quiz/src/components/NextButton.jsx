export function NextButton({dispatch, answer, numQuestions, index}) {
  // for the first question, the answer is null
  if (answer === null) return null;

  // Only showing the next button if it is not the last question 
  if (index < numQuestions - 1) {
    return (     
      <button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>   
    );
  }  

  // if it is the last question, show the finish button
  if (index === numQuestions - 1) { 
    return (
      <button className="btn btn-ui" onClick={() => dispatch({type: "finished"})}>Finish</button>
    );
  }
  
  
}

