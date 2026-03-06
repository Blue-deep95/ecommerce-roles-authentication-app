import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'


export default function Navigation() {

  const { user, logout } = useContext(AuthContext)

  return (
    <div>
      <Link to="/">Home</Link>

      {
        !user ?
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
          :
          null
      }
      {
        user?.role === "seller" &&
        <>
          <Link to="/seller/add-product">Add product</Link>
          <Link to="/seller/dashboard">Dashbooard</Link>
          <Link onClick={logout}>LogOut</Link>

        </>
      }
      {
        user?.role === "buyer" &&
        <>
          <Link to="/buyer/cart">Cart</Link>
          <Link to="/buyer/order">Orders</Link>
          <Link to="/buyer/dashboard">Dashbooard</Link>
          <Link onClick={logout}>LogOut</Link>
        </>
      }
    </div>
  )
}
