import React, { useContext } from 'react'
import ShoppingCartContext from '../context/ShoppingCartContext'

export default function ShoppingCart() {
    const { cartItems, showCart, setShowCart } = useContext(ShoppingCartContext)

    return (
        <div className="d-flex">
            <div className="dropdown">
                <button onClick={() => setShowCart(!showCart)} className="btn btn-outline-dark" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bi-cart-fill me-1"></i> Cart
                    <span className="badge bg-dark text-white ms-2 rounded-pill">
                        {cartItems.length}
                    </span>
                </button>
            </div>
        </div>
    )
}
