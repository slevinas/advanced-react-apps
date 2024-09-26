import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCities } from '../contexts/CitiesProvider'
import styles from './Map.module.css'

function Map() {

  const navigate = useNavigate();
  const {cities} = useCities()
  const [mapPosition, setMapPosition] = useState([23, 0])
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  useEffect(function() {
    if (lat && lng) {
      setMapPosition([lat, lng])
    }
    
  }, [lat, lng])

  return (
   
      <div className={styles.mapContainer}>
       <MapContainer 
        center={mapPosition} 
        zoom={3} 
        scrollWheelZoom={true}
        className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
           
            <Marker position={[city.position.lat, city.position.lng]} key={city.id} >
            <Popup>
             <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>

           
            
          ))}
          <ChangeCenter position={[lat || 40, lng || 0]} />
        </MapContainer>
      </div>
     

    
  )
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position, map.getZoom());

  return null;
}

export default Map
