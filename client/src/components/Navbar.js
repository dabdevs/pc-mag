import React, { useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { useAuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const { authUser } = useAuthContext()
  const [profileMenuToggled, setProfileMenuToggled] = useState(false)

  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand text-danger" href="/">
            <h3><strong>PC Mag</strong></h3>
          </a>

          <div className="d-flex gap-2">
            <ShoppingCart />

            <button className="btn btn-transparent">
              <FaUserCircle style={{ fontSize: '30px' }} onClick={() => setProfileMenuToggled(!profileMenuToggled)} />
            </button>

            {profileMenuToggled ? <ProfileMenu toggled={profileMenuToggled} user={authUser} /> : null}
          </div>
        </div>
      </nav>
    </div>
  );
}
