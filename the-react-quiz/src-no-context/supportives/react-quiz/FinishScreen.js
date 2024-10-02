export function FinishScreen({ dispatch, points, tot, highscore }) {
  // this is the percentage of the total points
  // rounded to 2 decimal places
  const percentage = Math.round(((points / tot) * 100)*100) / 100;

  let emoji;
  if (percentage < 50) {
    emoji = "😢";
  } else if (percentage < 80) {
    emoji = "😊";
  } else {
    emoji = "🥳";
  }

  return (
    <>
     
      <p className="result">
      <span>{emoji}</span> You have completed the quiz. You scored <strong>{points}</strong> out of <strong>{tot}</strong> points.(<strong>{percentage}%</strong>)
      </p>
      <p className="highscore">
        (Highscore: {highscore} points)
    </p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restartQuiz" })}>Restart</button>
    </>
  );
  
}