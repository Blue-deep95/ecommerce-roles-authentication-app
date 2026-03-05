import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SellerRegister from "./pages/Seller/SellerRegister.jsx"
import RegisterSelection from './pages/auth/RegisterSelection.jsx'
import Navigation from './pages/Navigation.jsx'

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/register' element={<RegisterSelection/>} />
          <Route path='/seller/register' element={<SellerRegister />}/>

        </Routes>
      </BrowserRouter>

    </>
  )
}
