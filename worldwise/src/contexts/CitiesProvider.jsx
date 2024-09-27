import { createContext, useContext, useEffect, useState } from 'react'


const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()


function CitiesProvider({children}) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(function(){
    async function fetchData(){
      try {
        setIsLoading(true)
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        setCities(data)
        
      } catch (error) {
        alert(`There was an error: ${error.message}`)
      }finally {
        setIsLoading(false)
        
      }
     
    }
    fetchData()
  }, [setIsLoading,setCities]) 

  async function getCity(id) {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      setCurrentCity(data)
      } catch (error) {
        alert(`There was an error: ${error.message}`)
      } finally {
        setIsLoading(false)
      }     
    }
    

    async function addCity(newCity) {
      try {
        setIsLoading(true)
        const response = await fetch(`${BASE_URL}/cities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCity)
        });
        
        const data = await response.json()
        setCities((cities) => [...cities, data])
        } catch (error) {
          alert(`There was an error Adding a city: ${error.message}`)
        } finally {
          setIsLoading(false)
        }     
      }

      // async function deleteCity(id) 
      async function deleteCity(id) {
        // console.log('from deleteCity', id);
        try {
          setIsLoading(true)
          // Dlete the city from the server (backend API)
         await fetch(`${BASE_URL}/cities/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          
      
          // Remove the city from the local state. keeping Remote and local state in sync.
          setCities((cities) => cities.filter(city => city.id !== id))
          } catch (error) {
            alert(`There was an error deleting a city... ${error.message}`)
          } finally {
            setIsLoading(false)
          }
      }
      
  
  return (
    <CitiesContext.Provider value={
      {
        cities, isLoading,
        setCities,
        setIsLoading,
        getCity,
        currentCity,
        addCity,
        deleteCity
        
      }
      }>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities(){
  const context = useContext(CitiesContext)
  if (!context){
    throw new Error('useCities must be used within a CitiesProvider')
  }
  return context
}

export { CitiesProvider, useCities }


