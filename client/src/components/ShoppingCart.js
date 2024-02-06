import React, { useContext } from 'react'
import ShoppingCartContext from '../context/ShoppingCartContext'

export default function ShoppingCart() {
    const { cartItems, showCart, setShowCart } = useContext(ShoppingCartContext)

    return (
        <button onClick={() => setShowCart(!showCart)} className="btn btn-outline-dark" type="button">
            <i className="bi-cart-fill me-1"></i>
            <span className="badge bg-dark text-white ms-2 rounded-pill">
                {cartItems.length}
            </span>
        </button>
    )
}
