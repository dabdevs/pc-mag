import React, { useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { useAuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../api/auth";
import DropdownList from "./Shared/Dropdown";

export default function Navbar() {
  const { authUser } = useAuthContext()

  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand text-danger" href="/">
            <h3><strong>PC Mag</strong></h3>
          </a>

          <div className="d-flex gap-2">
            <ShoppingCart />

            <DropdownList
              btnName={authUser? <FaUserCircle style={{ fontSize: '25px' }} /> : null}
              listItems={[{ name: authUser?.name, href: '/profile' }, { name: 'Dashboard', href: '/dashboard' }]}
              dividerItems={[{ name: <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button> }]}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
