import { Link, NavLink } from 'react-router-dom'
import styles from './CityItem.module.css'

const formatDate = (date) => 
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))


  export default function CityItem({city}) {
  const {cityName,emoji,date, id, position} = city
  // console.log(formatDate(date));

  return (
    <li >
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date} >({formatDate(date)})</time>
      <button className={styles.deleteBtn}>
        &times;
      </button>
      </Link>
      
      
      
    </li>
  )
}


