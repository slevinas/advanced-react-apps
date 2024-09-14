import { useReducer, useState } from "react"

function reducer(state, action) {
  /*
  state = {count: 0, step: 1}
  */
  switch (action.type) {
    case "inc":
      return {...state, count: state.count };
    case "dec":
      return {...state, count: state.count - 1};
    case "set":
      return {...state, count: action.payload};
    default:
      throw new Error("Invalid action type");
      
  }

}

function DateCounter() {
  // const [count, setCount] = useState(0);

  // const [count, setCount] = useReducer((state, action) => {}, 0);
  const initialState = {count: 0, step: 1};
  const [state, dispatch] = useReducer(reducer, initialState);

  const {count, step} = state;
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({type: "dec"});
  };

  const inc = function () {
    dispatch({type: "inc"});
    // // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      dispatch({ type: "set", payload: value });
    }

  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      dispatch({ type: "setStep", payload: value });
    }
  };

  const reset = function () {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount}
         onInput={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, "");
        }} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
