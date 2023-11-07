import React, { useContext, useState } from 'react'
import { useShoppingCartContext } from '../context/ShoppingCartContext'

export default function ShoppingCart() {
    const { quantity } = useShoppingCartContext()

    return (
        <form className="d-flex">
            <button className="btn btn-outline-dark" type="button">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-2 rounded-pill">
                    {quantity}
                </span>
            </button>
        </form>
    )
}
