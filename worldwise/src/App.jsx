import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'


import City from './components/City'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'

// import AppLayout from './pages/AppLayout'
// import Homepage from './pages/Homepage'
// import Login from './pages/Login'
// import PageNotFound from './pages/PageNotFound'
// import Pricing from './pages/Pricing'
// import Product from './pages/Product'

const AppLayout = lazy(() => import('./pages/AppLayout'))
const Homepage = lazy(() => import('./pages/Homepage'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))


// dist/assets/index-a724199f.css   30.58 kB │ gzip:   5.13 kB
// dist/assets/index-d38e35bb.js   507.45 kB │ gzip: 148.18 kB



function App() {
 
  
  return (
    <AuthProvider>
      <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login  />} />
          <Route path="app" element={
            <ProtectedRoute><AppLayout /></ProtectedRoute>
            
            }>
            <Route index element={<Navigate replace to='cities' />} />
            <Route path="cities" element={<CityList  />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList  />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        
        </Routes> 
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
      </AuthProvider>
     
    
  )
}

export default App
