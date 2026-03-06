import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom"
import axios from "../../services/axiosInstance.js"

export default function SellerLogin() {
  const [loginData, setLoginData] = useState({
    email: "", password: ""
  })
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    axios.post("/seller/login", loginData)
      .then((res) => {
        if (res.status === 200) {
          login(res.data)
          alert(res.data.message)
          navigate("/")
        }
      })
      .catch(err => {
        console.log(err.response)
      })

  }

  function handleChange(e) {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className='container mx-auto' >
      <div className='row' >
        <form className='col-12 col-md-6' onSubmit={handleLogin} >
          <h2>Seller Login</h2>
          <div className='mb-3' >
            <input
              className='form-control'
              type="email"
              name="email"
              placeholder='Enter your email'
              onChange={handleChange} />
          </div>
          <div className='mb-3' >
            <input
              className='form-control'
              type="password"
              name="password"
              placeholder='Enter your password'
              onChange={handleChange} />
          </div>
          <button className='btn btn-success'>
            Login!
          </button>
        </form>
      </div>
    </div>
  )
}
