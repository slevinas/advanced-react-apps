import { useCities } from '../contexts/CitiesProvider'

import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'
import Spinner from './Spinner'


function CityList() {
  const { cities, isLoading } = useCities()

  // onMount
  // useEffect(function(){

  // }, [cities])

  console.log('cities', cities);

  if (isLoading) {
    return (<Spinner />)    
  }
  if (cities.length === 0) {
    return (<Message message="Add your first city by clicking on a city on the map" />)
    }

  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
       <CityItem key={city.cityName} city={city} />
      ))}
    </ul>
  )
}

export default CityList
