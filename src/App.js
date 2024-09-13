import { useState } from "react"
import { useGeolocation } from "./useGeolocation"

// function useGeolocation() {}

export default function App() {
  // const [isLoading, setIsLoading] = useState(false);
  const [countClicks, setCountClicks] = useState(0);
  // const [position, setPosition] = useState({});
  // const [error, setError] = useState(null);

  
  const { position:{lat, lng}, isLoading, error, getPosition} = useGeolocation();

  // console.log(position);
  
  // const { lat, lng } = position;
  
  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
    
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="northerner"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
