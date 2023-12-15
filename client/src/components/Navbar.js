import React from "react";
import ShoppingCart from "./ShoppingCart";
import { useAuthContext } from "../context/AuthContext";
import { logout } from '../api/auth'

export default function Navbar() {
  const {auth, setAuth} = useAuthContext()

  const handleClick = () => {
    logout().then(() => {
      localStorage.removeItem('auth')
      setAuth(undefined)
    }).catch(err => console.log(err))
  }

  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand text-danger" href="/">
            <h3><strong>PC Mag</strong></h3>
          </a>

          <ShoppingCart />

          {auth && <button onClick={handleClick} className="btn btn-danger" type="button">Logout</button>}
        </div>
      </nav>
    </div>
  );
}
