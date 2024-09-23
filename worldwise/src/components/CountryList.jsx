import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'



export default function CountryList({cities, isLoading}) {

  const countries = cities.reduce((acc, city) => {
    if (!acc.includes(city.country)) {
      acc.push(city.country)
    }
    return acc
  }
  , [])


  if (isLoading) {
    return (<Spinner />)    
  }
  if (cities.length === 0) {
    return (<Message message="Add your first city by clicking on a city on the map" />)
    }

  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem key={country} country={country} />
      ))}
    </ul>
  )
}


