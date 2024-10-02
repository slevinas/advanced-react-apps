import { createContext, useContext, useEffect, useReducer } from 'react'

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};


// const AUTH_URL = 'http://localhost:8000/auth'
const USER_URL = 'http://localhost:8000/users'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  
}

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      console.log('from login reducer',action.payload);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
      default:
      throw new Error("Unkown action type");
    }
  }


 function AuthProvider({children}){
  const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

  // useEffect(function(){
  //   dispatch({type: 'loading'})
  //   fetch(`${AUTH_URL}/me`, {
  //     credentials: 'include'
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.error) {
  //       throw new Error(data.error)
  //     }
  //     dispatch({type: 'me/load', payload: data})
  //   })
  //   .catch(error => {
  //     dispatch({type: 'me/error', payload: error.message})
  //   })
  // }, [])

  async function login(email, password){
    
   try {
    
    const response = await fetch(`${USER_URL}/1`)
    console.log('from FakeAuthContext login: email,passwd', email, password);
    const userObj = await response.json()
    
    // console.log('from FakeAuthContext-login userObj.email:', userObj.email);

    
     if (email === userObj.email && password === userObj.password) {
      console.log('from FakeAuthContext login was dispatched');
       dispatch({type: 'login', payload: userObj})
      
     }
     
   } catch (error) {
    
    
   }
    
  }

  function logout(){
    dispatch({type: 'logout'})
  }

 

  return (
    <AuthContext.Provider value={
      {
        user,
        isAuthenticated,
        login,
        logout
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}

 function useAuth(){
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
export { AuthProvider, useAuth }
