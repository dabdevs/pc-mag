import React, { useContext } from 'react'
import ShoppingCartContext from '../context/ShoppingCartContext'

export default function ShoppingCart() {
    const { cartItems } = useContext(ShoppingCartContext)
   
    return (
        <form className="d-flex">
            <button className="btn btn-outline-dark" type="button">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-2 rounded-pill">
                    {cartItems.length}
                </span>
            </button>
        </form>
    )
}
