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
          alert(`There was an error: ${error.message}`)
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


