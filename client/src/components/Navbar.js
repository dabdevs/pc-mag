import React from "react";
import ShoppingCart from "./ShoppingCart";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand text-danger" href="/">
            <h3><strong>PC Mag</strong></h3>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            </ul> 

            <ShoppingCartProvider>
              <ShoppingCart />
            </ShoppingCartProvider>
          </div>
        </div>
      </nav>
    </div>
  );
}
