import { createContext, useContext, useEffect, useReducer } from 'react'


const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
   
      case 'loading':
        return {
          ...state,
          isLoading: true
        }
      case 'cities/load':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case 'cities/error':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case 'cities/add':
      console.log('from reducer cities/add was called');
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload], 
        currentCity: action.payload
      }
    case 'currentCity/selected':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
   
    case 'cities/delete':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      }
    default:
      throw new Error("Unkown action type");
      
  }
  
}

function CitiesProvider({children}) {
 

  const [{cities, isLoading, currentCity }, dispatch] = useReducer(reducer,initialState);



  useEffect(function(){
    async function fetchCities(){
      
      try {
        // setIsLoading(true)
        dispatch({type: 'loading'});
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        dispatch({type: 'cities/load', payload: data})
       
        
      } catch (error) {
        alert(`There was an error: ${error.message}`)
        dispatch({type: 'cities/error', payload: error.message})

      }
       
        
      
     
    }
     fetchCities()
  }, []) ;


  async function getCity(id) {
    try {
      // setIsLoading(true)

      dispatch({type: 'loading'});
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      // setCurrentCity(data)
      dispatch({type: 'currentCity/selected', payload: data})
      } catch (error) {
        alert(`There was an error: ${error.message}`)
        dispatch({type: 'cities/error', payload: error.message})

      }    
    }
    

    async function addCity(newCity) {
      try {
        // setIsLoading(true)
        dispatch({type: 'loading'})
        const response = await fetch(`${BASE_URL}/cities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCity)
        });
        
        const data = await response.json()
        // setCities((cities) => [...cities, data])
        dispatch({type: 'cities/add', payload: data})
        } catch (error) {
          alert(`There was an error Adding a city: ${error.message}`)
          dispatch({type: 'cities/error', payload: error.message})
        }  
      }

     
      async function deleteCity(id) {
        // console.log('from deleteCity', id);
        dispatch({type: 'loading'})
        try {
          // setIsLoading(true)
          // Dlete the city from the server (backend API)
         await fetch(`${BASE_URL}/cities/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          
      
          // Remove the city from the local state. keeping Remote and local state in sync.
          // setCities((cities) => cities.filter(city => city.id !== id))
          dispatch({type: 'cities/delete', payload: id})
          } catch (error) {
            dispatch({type: 'cities/error', payload: error.message})
          } 
      }
      
  
  return (
    <CitiesContext.Provider value={
      {
        cities,
        isLoading,
        getCity,
        currentCity,
        addCity,
        deleteCity,
        
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


