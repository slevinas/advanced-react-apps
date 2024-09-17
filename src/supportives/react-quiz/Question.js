export function Question({question, dispatch, answer}) {
  return (
    <div >
     
      <h4>
        {question.question}
      </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
      <button className="btn btn-ui" 
        >Submit Answer</button>
    </div>
  );
  
}

export function Options({question, dispatch, answer}) {
  return (
    
      <div className="options">
        {question.options.map((option,index) => (
         <button
           key={option}
           disabled={answer !== null}
           className={`btn btn-option ${answer === index ? "answer" : ""} ${index === question.correctOption ? "correct" : "wrong"}`}
            onClick={() => dispatch({type: "newAnswer", payload: index})}
         >{option}</button>))}
      </div>
     
  );
  
}