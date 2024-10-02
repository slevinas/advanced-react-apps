import User from '../components/User'
import { useAuth } from '../contexts/FakeAuthContext'

import Map from '../components/Map'

import { Sidebar } from "../components/Sidebar"
import styles from './AppLayout.module.css'

function AppLayout() {
  const {user} = useAuth();
  
  
  return (
    
      <div className={styles.app}>
        {user && <User />}
       
     <Sidebar />

     <Map />
       
      </div>
    
  )
}

export default AppLayout