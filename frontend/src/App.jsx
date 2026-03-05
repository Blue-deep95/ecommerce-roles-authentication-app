import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SellerRegister from "./pages/Seller/SellerRegister.jsx"
import RegisterSelection from './pages/auth/RegisterSelection.jsx'
import Navigation from './pages/Navigation.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <Navigation/>
        <Routes>
          <Route path='/register' element={<RegisterSelection/>} />
          <Route path='/seller/register' element={<SellerRegister />}/>

        </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}
