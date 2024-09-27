import { Link } from 'react-router-dom'
import { useCities } from '../contexts/CitiesProvider'
import styles from './CityItem.module.css'



const formatDate = (date) => 
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))


  export default function CityItem({city}) {
    const {currentCity, deleteCity} = useCities()
    const {cityName,emoji,date, id, position} = city
    // if the currentCity id is the same as the id of the city, then the city is selected
    const isSelected = currentCity.id === id

     function handleDelete(e) {
      // this is needed to prevent clicking on the link that wraps the button
      e.preventDefault()
       deleteCity(city.id)
    }
  

  return (
    <li >
      <Link
        className={`${styles.cityItem} ${isSelected ? 
          styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date} >({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handleDelete} >
        &times;
      </button>
      </Link>
      
      
      
    </li>
  )
}


