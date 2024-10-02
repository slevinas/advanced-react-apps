import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import { useUrlPosition } from '../hooks/useUrlPosition'
import Button from './Button'
import styles from './Map.module.css'

function Map() {

  const {cities} = useCities()
  const [mapPosition, setMapPosition] = useState([23, 0])
  const {
    position: geolocationPosition, isLoading:isLoadingPosition, getPosition
  } = useGeolocation();

  const {lat, lng} = useUrlPosition()
 

  useEffect(function() {
    // sync the map position with the url
    if (lat && lng) {
      setMapPosition([lat, lng])
    }
    
  }, [lat, lng])

  // sync the map position with the geolocation
  useEffect(function() {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition])

  return (
   
      <div className={styles.mapContainer}>
        {!geolocationPosition && (
          <Button type="position" onClick={getPosition} disabled={isLoadingPosition}>
          {isLoadingPosition ? "Loading..." : "Use my location"}
        </Button>)
        }
       <MapContainer 
        center={mapPosition} 
        zoom={6} 
        scrollWheelZoom={true}
        className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
           
            <Marker position={[city.position.lat, city.position.lng]} key={city.cityName} >
            <Popup>
             <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>            
          ))}
          
          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      </div>
     

    
  )
}

function ChangeCenter({position}) {

  const map = useMap();
 
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      console.log(e);
      const position = e.latlng;
      navigate(`form?lat=${position.lat}&lng=${position.lng}`)
    }
  })

  return null;

}

export default Map
