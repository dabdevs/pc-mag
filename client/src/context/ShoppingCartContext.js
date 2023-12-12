import { createContext, useState, useEffect, useContext } from "react";
import React, { useReducer } from 'react';

// Action Types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

// Reducer Function
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const updatedCart = [...state, action.product]
            localStorage.setItem('cartItems', JSON.stringify(updatedCart))
            return updatedCart;
        case REMOVE_FROM_CART:
            const newCart = state.filter(item => item._id !== action.productId)
            localStorage.setItem('cartItems', JSON.stringify(newCart))
            return state.filter(item => item._id !== action.productId);
        case CLEAR_CART:
            localStorage.removeItem('cartItems')
            return [];
        default:
            return state;
    }
};

const ShoppingCartContext = createContext({})

export const useShoppingCartContext = () => useContext(ShoppingCartContext)

export const ShoppingCartProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false)

    // Initial state for the shopping cart
    const initialState = JSON.parse(localStorage.getItem('cartItems')) || [];

    const [cartItems, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = product => {
        dispatch({ type: ADD_TO_CART, product });
    };

    const removeFromCart = productId => {
        dispatch({ type: REMOVE_FROM_CART, productId });
    };

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    return (
        <ShoppingCartContext.Provider value={{
            addToCart,
            removeFromCart,
            clearCart,
            cartItems,
            showCart,
            setShowCart
        }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContext;