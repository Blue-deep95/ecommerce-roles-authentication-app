import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SellerRegister from "./pages/Seller/SellerRegister.jsx"
import RegisterSelection from './pages/auth/RegisterSelection.jsx'
import Navigation from './pages/Navigation.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import LoginSelection from './pages/auth/LoginSelection.jsx'
import SellerLogin from './pages/Seller/SellerLogin.jsx'
import Home from "./pages/Home.jsx"

export default function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path='/register' element={<RegisterSelection/>} />
          <Route path='/seller/register' element={<SellerRegister />}/>
          <Route path='/login' element={<LoginSelection/>} />
          <Route path='/seller/login' element={<SellerLogin/>} />


        </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}
