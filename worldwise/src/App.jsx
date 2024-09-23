import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Pricing from './pages/Pricing'
import Product from './pages/Product'


function App() {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayout />} />

       
      </Routes> 
    </BrowserRouter>
     
    
  )
}

export default App
