// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUrlPosition } from "../hooks/useUrlPosition"
import BackButton from "./BackButton"
import Button from "./Button"
import styles from "./Form.module.css"
import Message from "./Message"
import Spinner from "./Spinner"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const {lat, lng} = useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("")

  const GEO_CODING_API = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(function(){
    if (!lat || !lng) {
      return;
    }
    async function fetchCityData(){
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError("")
        const response = await fetch(`${GEO_CODING_API}?latitude=${lat}&longitude=${lng}`)
        const data = await response.json()
        if (!data.countryCode) {
          throw new Error("That doesn't look like a city!. try clicking some where on the map");          
        }

        console.log('from form fetchCityData', data);
        const {city, countryName, countryCode} = data
        // console.log(city, countryName);
        setCityName(city || "Unknown city")
        setCountry(countryName || "Unknown country")
        setEmoji(convertToEmoji(countryCode))
        
      } catch (error) {
        setGeocodingError(error.message)
      }finally {
        setIsLoadingGeocoding(false)
        
      }
     
    }
    fetchCityData()
  }, [lat, lng]) ;

  if (isLoadingGeocoding) {
    return <Spinner />;
    
  }

  if (!lat || !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
    
  }

  if (geocodingError) {
    return   <Message message={geocodingError} />;
          
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
    };
    console.log(newCity);
    // navigate("/");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
