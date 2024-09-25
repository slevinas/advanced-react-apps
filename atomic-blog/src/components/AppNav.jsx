import { NavLink } from 'react-router-dom'
import styles from './AppNav.module.css'

export function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li >
          <NavLink to="cities" className={styles.link} >
            Cities
          </NavLink>
        </li>
        <li >
          <NavLink to="countries" className={styles.link}>
            Countries
          </NavLink>
        </li>
      </ul>
      
    </nav>
  )
}

