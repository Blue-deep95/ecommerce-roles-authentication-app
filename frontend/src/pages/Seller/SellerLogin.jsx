import React from 'react'
import { useState,useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function SellerLogin() {
  const {user,login,logout} = useContext(AuthContext)

  function handleLogin(e){
    e.preventDefault()
  }
  function handleChange(e){
    
  }

  return (
    <div className='container' >
      <div className='row' >
          <form className='col' >
            
          </form>
      </div>
    </div>
  )
}
