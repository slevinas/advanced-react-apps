export function Question({question, dispatch, answer}) {
  return (
    <div >
     
      <h4>
        {question.question}
      </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
     
    </div>
  );
  
}

export function Options({question, dispatch, answer}) {

  const hasAnswered = answer !== null;

  return (
    
      <div className="options">
        {question.options.map((option,index) => (
         <button
           key={option}
           disabled={hasAnswered}
           className={`btn btn-option ${answer === index ? "answer" : ""} ${hasAnswered &&index === question.correctOption ? "correct" : "wrong"}`}
            onClick={() => dispatch({type: "newAnswer", payload: index})}
         >{option}</button>))}
      </div>
     
  );
  
}