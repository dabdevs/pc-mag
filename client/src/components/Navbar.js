import React from "react";
import ShoppingCart from "./ShoppingCart";

export default function Navbar() {
  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand text-danger" href="/">
            <h3><strong>PC Mag</strong></h3>
          </a>

          <ShoppingCart />
        </div>
      </nav>
    </div>
  );
}
