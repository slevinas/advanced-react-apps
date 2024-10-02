export  function StartScreen({numQuestions, dispatch}) {
 

  return (
    <div className="start-screen">
      <h2>Welcome to the React Quiz
        !
      </h2>
      <h3>
        {numQuestions} questions to Test you React mastery. You can start the quiz by clicking the button below.
      </h3>
      <button className="btn btn-ui"
       onClick={() => dispatch({type: "startQuiz"})}>Start Quiz</button>
    </div>
  );
  
}