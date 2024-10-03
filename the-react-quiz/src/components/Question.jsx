import { useQuiz } from "../contexts/QuizContext"

export function Question() {
  const {questions, index} = useQuiz();

  const question = questions[index];
  // console.log('question',question);

  return (
    < >
     
      <h4>
       {question.question}
      </h4>
      <Options question={question}  />
     
    </>
  );
  
}

export function Options({question}) {
  const {answer, dispatch} = useQuiz();

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