import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'



export default function CountryList({cities, isLoading}) {

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, {country: city.country, emoji: city.emoji}]
    }
    else {
    return arr
    }
  }
  // this code checks if the country is already in the array, if it is, it returns the array as is, if it isn't, it adds the country to the array 
  , [])
console.log(countries);

  if (isLoading) {
    return (<Spinner />)    
  }
  if (cities.length === 0) {
    return (<Message message="Add your first city by clicking on a city on the map" />)
    }

  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem  country={country} />
      ))}
    </ul>
  )
}


