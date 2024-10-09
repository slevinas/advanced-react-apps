import { useEffect, useReducer, useState } from "react"
import Calculator from "./Calculator"
import ToggleSounds from "./ToggleSounds"

function reducer(state, action) {
  switch (action.type) {
    case "initialPartOfDay":
      return {...state, partOfDay: action.payload};
    case "changeOfDayTime":
      return {...state, partOfDay: action.payload};
    default:
      throw new Error("Unkown action type");
      ;
  }
  
}

const initialState = {partOfDay: ""};

function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));
  const [{partOfDay}, dispatch] = useReducer(reducer, initialState);

  // Will be be AM or PM
  // const partOfDay = time.slice(-2);
  // const currentTime = new Date(); // Wed Oct 09 2024 09:57:35 GMT-0400 (Eastern Daylight Time)
  // const partOfDay = currentTime.getHours() < 12 ? 'AM' : 'PM';
  // console.log('time', time); //Oct 24, 09:44:14 AM

  // const timeOfDay = currentTime.getHours();
  // const testAM = timeOfDay < 12 ? 'AM' : 'PM';
  // const nextChangeOfAMPM = timeOfDay < 12 ? 12 - timeOfDay : 24 - timeOfDay;

  // console.log('currentTime', currentTime);
  // console.log('nextChangeOfAMPM', nextChangeOfAMPM);
  // console.log('toTimeString', currentTime.toTimeString());
  const workouts = [
    {
      name: "Full-body workout",
      numExercises: partOfDay === "AM" ? 9 : 8,
    },
    {
      name: "Arms + Legs",
      numExercises: 6,
    },
    {
      name: "Arms only",
      numExercises: 3,
    },
    {
      name: "Legs only",
      numExercises: 4,
    },
    {
      name: "Core only",
      numExercises: partOfDay === "AM" ? 5 : 4,
    },
  ];

  function formatTime(date) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  // useEffect(function () {
  //   const id = setInterval(function () {
  //     setTime(formatTime(new Date()));
  //   }, 1000);

  //   return () => clearInterval(id);
  // }, []);

  useEffect(() => {
    // Function to execute at the change of AM/PM
    const handleChangeOfDayTime = () => {
      console.log('Day time changed from AM to PM or PM to AM');
      // Add your logic here
      const amOrpm = new Date().getHours() < 12 ? "AM" : "PM";
      dispatch({type: 'changeOfDayTime', payload: amOrpm});
    };
    
    const currentHours = (new Date()).getHours();

    function setInitialTimeOfDay() {
      const amOrpm = (new Date()).getHours() < 12 ? "AM" : "PM";
     
        dispatch({type: "initialPartOfDay", payload: amOrpm});
     
    }

    // Calculate the time remaining until the next change of AM/PM
    // const currentTime = new Date();
    const currentMinutes = (new Date()).getMinutes();
    const currentSeconds = (new Date()).getSeconds();

    let hoursUntilNextChange;
    if (currentHours < 12) {
      // AM to PM
      hoursUntilNextChange = 12 - currentHours;
    } else {
      // PM to AM
      hoursUntilNextChange = 24 - currentHours;
    }

    const minutesUntilNextChange = 60 - currentMinutes - 1;
    const secondsUntilNextChange = 60 - currentSeconds;

    const timeUntilNextChange =
      hoursUntilNextChange * 60 * 60 * 1000 +
      minutesUntilNextChange * 60 * 1000 +
      secondsUntilNextChange * 1000;

    // Set a timeout to execute the function at the next change of AM/PM
    const timeoutId = setTimeout(() => {
      handleChangeOfDayTime();
      // Set an interval to execute the function every 12 hours after the first execution
      setInterval(handleChangeOfDayTime, 12 * 60 * 60 * 1000);
    }, timeUntilNextChange);

    // Set the initial time of day
    setInitialTimeOfDay();

    // Cleanup the timeout and interval on component unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts}  />
    </main>
  );
}

export default App; 
